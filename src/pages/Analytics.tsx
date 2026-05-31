import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import api from '../api/api.js';
import { formatCurrency } from '../utils/formatCurrency.js';

export default function Analytics() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get('/transactions');
        setTransactions(response.data || []);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);
    
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);
    
  const netBalance = totalIncome - totalExpense;

  const hasData = totalIncome > 0 || totalExpense > 0;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics Overview</h1>
        <p className="text-gray-400 text-sm mt-1">Review your financial summary and metrics.</p>
      </div>

      {!isLoading && !hasData ? (
        <div className="glass p-10 rounded-2xl flex flex-col items-center justify-center text-center border-dashed border-2 border-white/10">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <DollarSign className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No transaction data available to show analytics.</h3>
          <p className="text-gray-400 max-w-md">Add some income or expenses!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Income */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-1">Total Income</p>
                <h3 className="text-3xl font-bold text-emerald-400">{formatCurrency(totalIncome)}</h3>
              </div>
              <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-500">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </motion.div>

          {/* Total Expense */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-1">Total Expense</p>
                <h3 className="text-3xl font-bold text-red-400">{formatCurrency(totalExpense)}</h3>
              </div>
              <div className="p-3 bg-red-500/20 rounded-xl text-red-500">
                <TrendingDown className="w-6 h-6" />
              </div>
            </div>
          </motion.div>

          {/* Net Balance */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-1">Net Balance</p>
                <h3 className="text-3xl font-bold text-blue-400">{formatCurrency(netBalance)}</h3>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-xl text-blue-500">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}