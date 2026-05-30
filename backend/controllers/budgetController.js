import Budget from '../models/Budget.js';
import Transaction from '../models/Transaction.js';

// @desc    Set or update budget
// @route   POST /api/budgets
export const setBudget = async (req, res) => {
  const { category, limit } = req.body;
  try {
    let budget = await Budget.findOne({ user: req.user._id, category });
    if (budget) {
      budget.limit = limit;
      await budget.save();
    } else {
      budget = await Budget.create({ user: req.user._id, category, limit });
    }
    res.status(201).json(budget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get budgets with current spent amounts
// @route   GET /api/budgets
export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user._id });
    const transactions = await Transaction.find({ user: req.user._id, type: 'expense' });
    
    const spentByCategory = {};
    transactions.forEach(t => {
      spentByCategory[t.category] = (spentByCategory[t.category] || 0) + Math.abs(t.amount);
    });

    res.json(budgets.map(b => ({ _id: b._id, category: b.category, limit: b.limit, spent: spentByCategory[b.category] || 0 })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};