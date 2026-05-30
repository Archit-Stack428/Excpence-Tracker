import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, DollarSign, Moon, Bell, Shield, Key, Camera } from 'lucide-react';

// Reusable toggle component for premium UI feel
const Toggle = ({ enabled, onChange }: { enabled: boolean, onChange: () => void }) => (
  <button
    type="button"
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
      enabled ? 'bg-blue-600' : 'bg-gray-600'
    }`}
  >
    <span 
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        enabled ? 'translate-x-6' : 'translate-x-1'
      }`} 
    />
  </button>
);

export default function ProfileSettings() {
  // Avatar upload state
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock states for premium SaaS toggles
  const [darkMode, setDarkMode] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [expenseAlerts, setExpenseAlerts] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  // Handle local file preview without making a backend request
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Profile & Settings</h1>
        <p className="text-gray-400 text-sm mt-1">Manage your account preferences and security.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Personal Info & Avatar */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-800 p-6 sm:p-8 rounded-2xl border border-gray-700 shadow-lg space-y-6">
            
            {/* Avatar Section */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="relative inline-block">
                <div className="w-24 h-24 rounded-full bg-gray-900 flex items-center justify-center overflow-hidden border-4 border-gray-700 shadow-xl">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg border-2 border-gray-800"
                >
                  <Camera className="w-4 h-4" />
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageChange} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Archit Prajapati</h3>
                <p className="text-gray-400 text-sm">Update your photo and personal details.</p>
              </div>
            </div>

            <hr className="border-gray-700" />

            {/* Personal Details Form */}
            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" /> Display Name
                </label>
                <input type="text" defaultValue="Archit Prajapati" className="w-full py-3 px-4 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" /> Email Address
                </label>
                <input type="email" defaultValue="archit@example.com" className="w-full py-3 px-4 bg-gray-900 border border-gray-700 rounded-xl text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-500" /> Currency Preference
                </label>
                <select className="w-full py-3 px-4 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none transition-all">
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
            </div>
            
            <div className="pt-2">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors w-full sm:w-auto shadow-lg shadow-blue-500/20">
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Toggles and Security */}
        <div className="space-y-6">
          {/* Appearance Section */}
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg">
            <div className="flex items-center gap-2 mb-6">
              <Moon className="w-5 h-5 text-indigo-400" />
              <h3 className="text-lg font-bold text-white">Appearance</h3>
            </div>
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-medium text-white">Dark Mode</p><p className="text-xs text-gray-400 mt-0.5">Toggle dark theme</p></div>
              <Toggle enabled={darkMode} onChange={() => setDarkMode(!darkMode)} />
            </div>
          </div>

          {/* Notifications Section */}
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="w-5 h-5 text-yellow-400" />
              <h3 className="text-lg font-bold text-white">Notifications</h3>
            </div>
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-medium text-white">Email Updates</p><p className="text-xs text-gray-400 mt-0.5">Weekly summaries</p></div>
              <Toggle enabled={emailNotifs} onChange={() => setEmailNotifs(!emailNotifs)} />
            </div>
            <hr className="border-gray-700" />
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-medium text-white">Expense Alerts</p><p className="text-xs text-gray-400 mt-0.5">When over budget</p></div>
              <Toggle enabled={expenseAlerts} onChange={() => setExpenseAlerts(!expenseAlerts)} />
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">Security</h3>
            </div>
            <div className="flex items-center justify-between mb-6">
              <div><p className="text-sm font-medium text-white">Two-Factor Auth</p><p className="text-xs text-gray-400 mt-0.5">Extra account security</p></div>
              <Toggle enabled={twoFactor} onChange={() => setTwoFactor(!twoFactor)} />
            </div>
            <button className="w-full py-3 px-4 bg-gray-900 border border-gray-700 rounded-xl text-sm font-medium text-white hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 shadow-inner">
              <Key className="w-4 h-4" /> Change Password
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}