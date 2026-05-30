import { motion } from 'framer-motion';
import { formatCurrency } from '../utils/formatCurrency.js';

export default function BudgetPlanning() {
  const budgets = [
    { name: 'Housing', spent: 1200, limit: 1500, color: 'bg-blue-500' },
    { name: 'Food', spent: 450, limit: 600, color: 'bg-green-500' },
    { name: 'Transportation', spent: 180, limit: 200, color: 'bg-yellow-500' },
    { name: 'Entertainment', spent: 210, limit: 150, color: 'bg-red-500' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Budget Planning</h1>
        <p className="text-gray-400 text-sm mt-1">Manage your monthly spending limits.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {budgets.map((budget, idx) => {
          const percentage = Math.min((budget.spent / budget.limit) * 100, 100);
          const isOver = budget.spent > budget.limit;

          return (
            <div key={idx} className="glass p-6 rounded-2xl">
              <div className="flex justify-between mb-2"><span className="font-medium text-white">{budget.name}</span><span className="text-gray-400 text-sm">{formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}</span></div>
              <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden mt-3"><div className={`h-full rounded-full ${isOver ? 'bg-red-500' : budget.color}`} style={{ width: `${percentage}%` }}></div></div>
              {isOver && <p className="text-red-400 text-xs mt-2">Over budget by {formatCurrency(budget.spent - budget.limit)}</p>}
            </div>
          )
        })}
      </div>
    </motion.div>
  );
}