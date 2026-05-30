import Transaction from '../models/Transaction.js';

// @desc    Add a new transaction
// @route   POST /api/transactions
export const addTransaction = async (req, res) => {
  try {
    // Create transaction linked to the logged-in user (req.user._id)
    const transaction = await Transaction.create({ ...req.body, user: req.user._id });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user transactions
// @route   GET /api/transactions
export const getTransactions = async (req, res) => {
  try {
    // Fetch all transactions for the logged-in user, sorted by newest first
    const transactions = await Transaction.find({ user: req.user._id }).sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a transaction
// @route   PUT /api/transactions/:id
export const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction || transaction.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Transaction not found or unauthorized' });
    }
    const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a transaction
// @route   DELETE /api/transactions/:id
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction || transaction.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Transaction not found or unauthorized' });
    }
    await transaction.deleteOne();
    res.status(200).json({ message: 'Transaction removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get analytics/summary
// @route   GET /api/transactions/analytics
export const getAnalytics = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id });
    
    let totalIncome = 0;
    let totalExpense = 0;
    const categoryBreakdown = {};

    transactions.forEach(t => {
      if (t.type === 'income') {
        totalIncome += t.amount;
      } else {
        totalExpense += Math.abs(t.amount);
        categoryBreakdown[t.category] = (categoryBreakdown[t.category] || 0) + Math.abs(t.amount);
      }
    });

    res.status(200).json({
      totalIncome, totalExpense, balance: totalIncome - totalExpense, categoryBreakdown
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};