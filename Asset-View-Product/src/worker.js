// worker.js

const { Worker } = require('bullmq');
const { redisConnection } = require('./queue');
const mongoose = require('mongoose');
const { Account, PortfolioSnapshot } = require('./models');
const IORedis = require('ioredis');
const axios = require('axios');
const { toNumber } = require('./utils');

const redis = new IORedis( 'redis://default:gp93Kjeay56qUqoEbyw9hxhRLZabgW5B@redis-17764.c280.us-central1-2.gce.cloud.redislabs.com:17764');

const QUEUE = 'price-jobs';

const ConnectDB=require('../config/db');

async function connectMongo() {
  await ConnectDB();
}

// Recalculate portfolios for accounts holding assetId (incremental)
async function recalcForAsset(assetId, price, timestamp) {
  // find accounts containing this asset
  const accounts = await Account.find({ 'holdings.assetId': assetId }).lean();

  for (const acc of accounts) {
    // rebuild holdings values
    let total = toNumber(acc.cashBalance || 0);
    const holdingsOut = acc.holdings.map(h => {
      const qty = toNumber(h.quantity);
      const assetPrice = (h.assetId === assetId) ? toNumber(price) : toNumber(h.lastKnownPrice || 0);
      const value = qty * assetPrice;
      total += value;
      return { assetId: h.assetId, quantity: qty, price: assetPrice, value };
    });

    // update snapshot
    const now = new Date();
    const snap = await PortfolioSnapshot.findOneAndUpdate(
      { accountId: acc.accountId },
      {
        $set: {
          userId: acc.userId,
          totalValue: total,
          holdings: holdingsOut,
          lastUpdated: now
        },
        $inc: { version: 1 }
      },
      { upsert: true, new: true }
    );

    // update Redis cache (simple JSON)
    try {
      await redis.set(`portfolio:${acc.accountId}`, JSON.stringify(snap), 'EX', 60 * 30); // 30 min TTL
    } catch (e) { console.error('redis set error', e); }

    // publish via HTTP to ingest server's admin endpoint (Socket.io) to push to user room
    try {
      await axios.post(`http://localhost:${3000}/admin/publish`, {
        userId: acc.userId,
        payload: { accountId: acc.accountId, snapshot: snap }
      }, { timeout: 2000 });
    } catch (e) {
      // If local publish fails, you can also use Redis pub/sub with socket adapter in prod
      console.warn('publish to socket failed (ok if server not running):', e.message);
    }
  }
}

async function startWorker() {
  await connectMongo();
  console.log('Worker connected to MongoDB');

  const worker = new Worker(QUEUE, async job => {
    const data = job.data;
    // job for price event: { assetId, price, currency, timestamp, sourceId, seqId }
    console.log('Processing price event', data.assetId, data.price);
    await recalcForAsset(data.assetId, data.price, data.timestamp);
  }, { connection: redisConnection });

  worker.on('completed', job => console.log(`Job ${job.id} completed`));
  worker.on('failed', (job, err) => console.error(`Job ${job.id} failed`, err));
}

startWorker().catch(err => { console.error(err); process.exit(1); });
