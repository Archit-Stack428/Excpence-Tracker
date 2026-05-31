import React, { useState, useEffect, useRef } from 'react';
import { Menu, Plus, Search, Bell, UserCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  onMenuClick: () => void;
  onAddClick: () => void;
}

export default function Navbar({ onMenuClick, onAddClick }: NavbarProps) {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadProfilePic = () => {
      const savedPic = localStorage.getItem('profilePic');
      if (savedPic) setProfilePic(savedPic);
    };
    loadProfilePic();
    window.addEventListener('profilePicUpdated', loadProfilePic);
    return () => window.removeEventListener('profilePicUpdated', loadProfilePic);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfilePic(base64String);
        localStorage.setItem('profilePic', base64String);
        window.dispatchEvent(new Event('profilePicUpdated'));
      };
      reader.readAsDataURL(file);
    }
  };

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
        
        <div 
          className="w-9 h-9 rounded-full bg-gradient-to-tr from-secondary to-purple-500 p-0.5 cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="w-full h-full rounded-full bg-slate-900 border-2 border-transparent overflow-hidden">
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <UserCircle className="w-full h-full text-gray-400 bg-slate-900" />
            )}
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      </div>
    </header>
  );
}