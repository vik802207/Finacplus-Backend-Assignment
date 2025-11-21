// models.js
const mongoose = require('mongoose');

const HoldingSchema = new mongoose.Schema({
  assetId: { type: String, required: true, index: true },
  quantity: { type: Number, required: true },
  avgCost: { type: Number, required: false }
}, { _id: false });

const AccountSchema = new mongoose.Schema({
  accountId: { type: String, required: true, unique: true },
  userId: { type: String, required: true, index: true },
  holdings: { type: [HoldingSchema], default: [] },
  cashBalance: { type: Number, default: 0 }
}, { timestamps: true });

const PortfolioSnapshotSchema = new mongoose.Schema({
  accountId: { type: String, required: true, index: true },
  userId: { type: String, required: true },
  totalValue: { type: Number, required: true },
  holdings: [{
    assetId: String,
    quantity: Number,
    price: Number,
    value: Number
  }],
  lastUpdated: { type: Date, default: Date.now },
  version: { type: Number, default: 1 }
});

const PriceEventSchema = new mongoose.Schema({
  assetId: { type: String, required: true, index: true },
  price: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  sourceId: { type: String, required: false },
  timestamp: { type: Date, default: Date.now },
  seqId: { type: String }
}, { timestamps: true });

const Account = mongoose.model('Account', AccountSchema);
const PortfolioSnapshot = mongoose.model('PortfolioSnapshot', PortfolioSnapshotSchema);
const PriceEvent = mongoose.model('PriceEvent', PriceEventSchema);

module.exports = { Account, PortfolioSnapshot, PriceEvent };
