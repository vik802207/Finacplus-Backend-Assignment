// queue.js
const { Queue } = require('bullmq');
const IORedis = require('ioredis');
// require('dotenv').config();

const redisConnection = new IORedis( 'redis://default:gp93Kjeay56qUqoEbyw9hxhRLZabgW5B@redis-17764.c280.us-central1-2.gce.cloud.redislabs.com:17764');

const priceQueue = new Queue('price-jobs', {
  connection: redisConnection
});

module.exports = { priceQueue, redisConnection };
