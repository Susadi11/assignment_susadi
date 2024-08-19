import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  accountNo: {
    type: String,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0.0,
  },
});

export const Account = mongoose.model('Account', AccountSchema);