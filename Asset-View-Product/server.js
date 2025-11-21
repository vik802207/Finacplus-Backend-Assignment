// server.js
// require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const { priceQueue } = require('./src/queue')
const { PriceEvent } = require('./src/models'); // note: PriceEvent saved by worker too
const { uuidv4 } = require('./src/utils');
const nodeCron = require('node-cron');
const reconciler = require('./src/reconciler');

const PORT =  8000;
const WS_PORT =  PORT; // using same server for simplicity
const ConnectDB = require('./config/db')
ConnectDB();
async function main() {
  // connect mongo
  const app = express();
  app.use(express.json());

  // HTTP endpoint to receive price events
  // payload: { assetId, price, currency?, sourceId?, timestamp?, seqId? }
  app.post('/price', async (req, res) => {
    try {
      const { assetId, price, currency, sourceId, timestamp, seqId } = req.body;
      if (!assetId || price === undefined) return res.status(400).json({ error: 'assetId and price required' });

      const event = {
        assetId,
        price: Number(price),
        currency: currency || 'INR',
        sourceId: sourceId || 'unknown',
        timestamp: timestamp ? new Date(timestamp) : new Date(),
        seqId: seqId || uuidv4()
      };

      // enqueue job for worker
      await priceQueue.add('price-event', event, { removeOnComplete: true, removeOnFail: 1000 });

      // optional: persist raw event quickly for audit (fire-and-forget)
      try { await PriceEvent.create(event); } catch (e) { /* ignore */ }

      return res.json({ status: 'enqueued', event });
    } catch (err) {
      console.error('ingest error', err);
      return res.status(500).json({ error: 'internal error' });
    }
  });

  // simple health
  app.get('/health', (req, res) => res.json({ ok: true }));

  const server = http.createServer(app);
  const io = new Server(server, { cors: { origin: '*' } });

  // Socket.io namespaces or rooms per user
  io.on('connection', (socket) => {
    // client should emit join with their userId: socket.emit('join', { userId })
    socket.on('join', ({ userId }) => {
      if (userId) socket.join(`user:${userId}`);
    });
  });

  // expose a small admin route to broadcast portfolio updates (used by worker)
  app.post('/admin/publish', express.json(), async (req, res) => {
    const { userId, payload } = req.body;
    if (!userId || !payload) return res.status(400).json({ error: 'userId and payload required' });
    io.to(`user:${userId}`).emit('portfolio:update', payload);
    return res.json({ ok: true });
  });

  server.listen(PORT, () => console.log(`Ingest + WS server listening on ${PORT}`));

  // start reconciler cron (every 10 minutes) using env RECONCILE_CRON or default */10 * * * *
  const cronExpr =  '*/10 * * * *';
  nodeCron.schedule(cronExpr, async () => {
    console.log('Starting scheduled reconciliation');
    try {
      await reconciler.runReconcile();
      console.log('Reconcile finished');
    } catch (e) {
      console.error('Reconcile failed', e);
    }
  });
}

main().catch(err => { console.error(err); process.exit(1); });
