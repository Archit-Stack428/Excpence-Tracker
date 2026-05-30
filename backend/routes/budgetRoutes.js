import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { setBudget, getBudgets } from '../controllers/budgetController.js';

const router = express.Router();

// Budget API routes
router.route('/')
  .post(protect, setBudget)
  .get(protect, getBudgets);

export default router;