import mongoose from "mongoose"

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  srcAccountNo: {
    type: String,
    required: true,
    ref: 'Account',
  },
  destAccountNo: {
    type: String,
    required: true,
    ref: 'Account',
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const Transaction = mongoose.model('Transaction', TransactionSchema);
