import mongoose from "mongoose"

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    sourceAccountNumber: {
    type: String,
    required: true,
  },
  destinationAccountNumber: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

export const Transaction = mongoose.model('Transaction', TransactionSchema);
