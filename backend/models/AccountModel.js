import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  accountNumber: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

export const Account = mongoose.model('Account', AccountSchema);