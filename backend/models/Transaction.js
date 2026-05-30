import mongoose from 'mongoose';

// Transaction Database Schema (Linked to User)
const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);