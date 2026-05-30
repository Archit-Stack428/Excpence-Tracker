import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { addTransaction, getTransactions, updateTransaction, deleteTransaction, getAnalytics } from '../controllers/transactionController.js';

const router = express.Router();

// GET & POST /api/transactions (Protected by JWT)
router.get('/', protect, getTransactions);
router.post('/', protect, addTransaction);

// GET /api/transactions/analytics
router.get('/analytics', protect, getAnalytics);

// PUT & DELETE /api/transactions/:id
router.route('/:id')
  .put(protect, updateTransaction)
  .delete(protect, deleteTransaction);

export default router;