import { Menu, Plus, Search, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  onMenuClick: () => void;
  onAddClick: () => void;
}

export default function Navbar({ onMenuClick, onAddClick }: NavbarProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 glass z-10 sticky top-0 border-b border-white/5">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="p-2 text-gray-400 transition-colors rounded-lg md:hidden hover:text-white hover:bg-white/10">
          <Menu className="w-6 h-6" />
        </button>
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full w-64 lg:w-96 focus-within:ring-2 ring-primary/50 transition-all">
          <Search className="w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search transactions..." className="bg-transparent border-none outline-none text-sm w-full text-white placeholder:text-gray-500" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-400 transition-colors rounded-full hover:text-white hover:bg-white/10">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onAddClick}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-all bg-gradient-to-r from-primary to-emerald-500 rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Expense</span>
        </motion.button>
        
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-secondary to-purple-500 p-0.5 cursor-pointer">
          <div className="w-full h-full rounded-full bg-slate-900 border-2 border-transparent overflow-hidden">
            <img src="https://i.pravatar.cc/150?img=68" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
}