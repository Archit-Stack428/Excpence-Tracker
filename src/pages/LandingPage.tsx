import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wallet, PieChart, Shield, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[120px] pointer-events-none"></div>

      <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-2xl font-bold text-white">
          <Wallet className="w-8 h-8 text-primary" />
          <span>Fin<span className="text-primary">Track</span></span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-gray-300 hover:text-white font-medium transition-colors">Log in</Link>
          <Link to="/signup" className="px-5 py-2.5 bg-white text-slate-900 rounded-full font-semibold hover:bg-gray-200 transition-colors">Sign up</Link>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center px-6 pt-20 pb-32 text-center max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/30 text-primary mb-8">
          <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span></span>
          <span className="text-sm font-medium">FinTrack 2.0 is now live</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6">
          Take Control of Your <br/><span className="text-gradient">Financial Future</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl">
          The most powerful, intuitive, and secure expense tracker. Built for modern professionals who want to understand where their money goes.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link to="/signup" className="px-8 py-4 bg-gradient-to-r from-primary to-emerald-500 text-white rounded-full font-bold text-lg hover:shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-1">Get Started for Free</Link>
          <Link to="/dashboard" className="px-8 py-4 glass text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all">View Live Demo</Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }} className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
          {[
            { icon: PieChart, title: 'Smart Analytics', desc: 'Visualize your spending habits with interactive charts and insights.' },
            { icon: Shield, title: 'Bank-grade Security', desc: 'Your financial data is encrypted and securely stored.' },
            { icon: Zap, title: 'Lightning Fast', desc: 'Log expenses in seconds with our optimized glassmorphic interface.' }
          ].map((feature, i) => (
            <div key={i} className="glass p-8 rounded-3xl border-white/5 hover:border-primary/30 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}