import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Search, Filter } from 'lucide-react';
import { fetchTransactions } from '../api/transactionApi.js';

export default function ExpenseHistory() {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchTransactions();
        const formatted = data.map((t: any) => ({
          id: t._id,
          name: t.name,
          category: t.category,
          amount: t.type === 'income' ? Math.abs(t.amount) : -Math.abs(t.amount),
          date: new Date(t.date).toISOString().split('T')[0],
          status: 'Completed'
        }));
        setTransactions(formatted);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    loadData();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Transaction History</h1>
          <p className="text-gray-400 text-sm mt-1">View and manage all your past transactions.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search..." className="w-full py-2.5 pl-9 pr-4 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <button className="glass px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="text-gray-400 text-sm border-b border-white/5 bg-white/[0.02]">
                <th className="p-4 font-medium">Transaction</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {transactions.map((tx, i) => (
                <tr key={`${tx.id}-${i}`} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4"><div className="flex items-center gap-3"><div className={`p-2 rounded-xl ${tx.amount > 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>{tx.amount > 0 ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}</div><span className="font-medium text-gray-200">{tx.name}</span></div></td>
                  <td className="p-4 text-sm text-gray-400">{tx.category}</td>
                  <td className="p-4 text-sm text-gray-400">{tx.date}</td>
                  <td className="p-4"><span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{tx.status}</span></td>
                  <td className={`p-4 text-right font-medium ${tx.amount > 0 ? 'text-emerald-400' : 'text-white'}`}>{tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}