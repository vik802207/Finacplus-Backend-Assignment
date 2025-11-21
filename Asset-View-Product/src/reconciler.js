// reconciler.js

const mongoose = require('mongoose');
const { Account, PortfolioSnapshot } = require('./models');
const { toNumber } = require('./utils');

const connectDB=require('../config/db')

async function runReconcile() {
  await connectDB();

  console.log('[reconciler] loading accounts');
  const accounts = await Account.find({}).lean();

  for (const acc of accounts) {
    let total = toNumber(acc.cashBalance || 0);
    const holdingsOut = acc.holdings.map(h => {
      // For reconciliation we rely on lastKnownPrice stored in holdings (if present),
      // otherwise fallback to 0. In a real system we'd pull latest price store.
      const price = toNumber(h.lastKnownPrice || 0);
      const qty = toNumber(h.quantity);
      const value = qty * price;
      total += value;
      return { assetId: h.assetId, quantity: qty, price, value };
    });

    await PortfolioSnapshot.findOneAndUpdate(
      { accountId: acc.accountId },
      {
        $set: {
          userId: acc.userId,
          totalValue: total,
          holdings: holdingsOut,
          lastUpdated: new Date()
        },
        $inc: { version: 1 }
      },
      { upsert: true }
    );
  }

  console.log('[reconciler] done');
  await mongoose.connection.close();
}

module.exports = { runReconcile };

// allow running directly
if (require.main === module) {
  runReconcile().catch(err => { console.error(err); process.exit(1); });
}
