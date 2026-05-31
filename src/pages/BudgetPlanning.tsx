import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../utils/formatCurrency.js';
import { Plus, X } from 'lucide-react';

interface Budget {
  name: string;
  spent: number;
  limit: number;
  color: string;
}

export default function BudgetPlanning() {
  const [budgets, setBudgets] = useState<Budget[]>(() => {
    const saved = localStorage.getItem('budgets');
    return saved ? JSON.parse(saved) : [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [newLimit, setNewLimit] = useState('');

  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets));
  }, [budgets]);

  const handleAddBudget = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory || !newLimit) return;
    
    const newBudget: Budget = {
      name: newCategory,
      limit: Number(newLimit),
      spent: 0,
      color: ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500'][budgets.length % 5]
    };
    
    setBudgets([...budgets, newBudget]);
    setIsModalOpen(false);
    setNewCategory('');
    setNewLimit('');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Budget Planning</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your monthly spending limits.</p>
        </div>
        {budgets.length > 0 && (
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="px-4 py-2.5 bg-white/10 text-white hover:bg-white/20 rounded-xl transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <Plus className="w-4 h-4" /> Add Budget
          </button>
        )}
      </div>

      {budgets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 glass rounded-2xl border-dashed border-2 border-white/10">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Plus className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">No budgets set</h3>
          <p className="text-gray-400 text-sm mb-6 text-center max-w-md">You haven't added any budgets yet. Start tracking your spending limits by creating your first budget.</p>
          <button onClick={() => setIsModalOpen(true)} className="px-6 py-3 bg-white text-slate-900 rounded-full font-semibold hover:bg-gray-200 transition-colors">
            Add your first budget
          </button>
        </div>
      ) : (
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
      )}

      {/* Add Budget Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Add Budget</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddBudget} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Category Name</label>
                <input type="text" required value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="e.g. Housing" className="w-full py-2.5 px-4 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Budget Limit (₹)</label>
                <input type="number" required min="1" value={newLimit} onChange={(e) => setNewLimit(e.target.value)} placeholder="1500" className="w-full py-2.5 px-4 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors mt-2">
                Save Budget
              </button>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
}