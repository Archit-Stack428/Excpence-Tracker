import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Wallet, PiggyBank, TrendingUp, CreditCard } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { fetchTransactions } from '../api/transactionApi.js';
import { formatCurrency } from '../utils/formatCurrency.js';

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#ef4444'];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Dashboard() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch real database data via GET (token is attached automatically by interceptor)
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

        const categoryMap = data.filter((t: any) => t.type === 'expense').reduce((acc: any, curr: any) => {
          acc[curr.category] = (acc[curr.category] || 0) + Math.abs(curr.amount);
          return acc;
        }, {});
        setCategoryData(Object.keys(categoryMap).map(key => ({ name: key, value: categoryMap[key] })));

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthlyMap = data.reduce((acc: any, curr: any) => {
          const month = new Date(curr.date).getMonth();
          if (!acc[month]) acc[month] = { name: monthNames[month], income: 0, expense: 0 };
          if (curr.type === 'income') acc[month].income += Math.abs(curr.amount);
          else acc[month].expense += Math.abs(curr.amount);
          return acc;
        }, {});
        setMonthlyData(Object.values(monthlyMap));
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    loadData();
  }, []);

  const totalIncome = transactions.filter(t => t.amount > 0).reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = Math.abs(transactions.filter(t => t.amount < 0).reduce((acc, curr) => acc + curr.amount, 0));
  const totalBalance = totalIncome - totalExpense;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-gray-400 text-sm mt-1">Welcome back, here's your financial summary.</p>
        </div>
        <div className="glass px-4 py-2 rounded-lg flex items-center gap-2 text-sm text-gray-300">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Data synced up to date
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Balance', value: formatCurrency(totalBalance), icon: Wallet, fromClass: 'from-primary/10', bgClass: 'bg-primary/20', textClass: 'text-primary', trend: '+12.5%' },
          { label: 'Total Income', value: formatCurrency(totalIncome), icon: TrendingUp, fromClass: 'from-emerald-500/10', bgClass: 'bg-emerald-500/20', textClass: 'text-emerald-500', trend: '+8.2%' },
          { label: 'Total Expense', value: formatCurrency(totalExpense), icon: CreditCard, fromClass: 'from-red-500/10', bgClass: 'bg-red-500/20', textClass: 'text-red-500', trend: '-2.4%', isNegative: true },
          { label: 'Total Savings', value: formatCurrency(totalIncome * 0.2), icon: PiggyBank, fromClass: 'from-blue-500/10', bgClass: 'bg-blue-500/20', textClass: 'text-blue-500', trend: '+18.1%' }
        ].map((stat, i) => (
          <motion.div key={i} variants={item} className="glass p-6 rounded-2xl relative overflow-hidden group">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.fromClass} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-1">{stat.label}</p>
                <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
              </div>
              <div className={`p-3 ${stat.bgClass} rounded-xl ${stat.textClass}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className={`flex items-center px-2 py-0.5 rounded-full ${stat.isNegative ? 'text-red-400 bg-red-400/10' : 'text-green-400 bg-green-400/10'}`}>
                {stat.isNegative ? <ArrowDownRight className="w-3 h-3 mr-1" /> : <ArrowUpRight className="w-3 h-3 mr-1" />}
                {stat.trend}
              </span>
              <span className="text-gray-500">from last month</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={item} className="glass p-6 rounded-2xl lg:col-span-2">
          <h3 className="text-lg font-semibold text-white mb-6">Cash Flow Overview</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0}/></linearGradient>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/><stop offset="95%" stopColor="#ef4444" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value}`} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} itemStyle={{ color: '#fff' }} />
                <Area type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                <Area type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={item} className="glass p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-6">Expenses by Category</h3>
          <div className="h-[220px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                  {categoryData.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
              <span className="text-2xl font-bold text-white">100%</span>
              <span className="text-xs text-gray-400">Total</span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {categoryData.slice(0, 4).map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></span>
                <span className="text-sm text-gray-300 truncate">{entry.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div variants={item} className="glass rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
          <button className="text-sm text-primary hover:text-emerald-400 transition-colors">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
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
              {transactions.slice(0, 5).map((tx) => (
                <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4"><div className="flex items-center gap-3"><div className={`p-2 rounded-xl ${tx.amount > 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>{tx.amount > 0 ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}</div><span className="font-medium text-gray-200">{tx.name}</span></div></td>
                  <td className="p-4 text-sm text-gray-400">{tx.category}</td>
                  <td className="p-4 text-sm text-gray-400">{tx.date}</td>
                  <td className="p-4"><span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{tx.status}</span></td>
                  <td className={`p-4 text-right font-medium ${tx.amount > 0 ? 'text-emerald-400' : 'text-white'}`}>{tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}