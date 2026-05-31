import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { UserCircle, Mail, DollarSign, Moon, Bell, Shield, Key, Camera } from 'lucide-react';

// Reusable toggle component for premium UI feel
const Toggle = ({ enabled, setEnabled }: { enabled: boolean, setEnabled: (val: boolean) => void }) => (
  <button
    type="button"
    onClick={() => setEnabled(!enabled)}
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
  const [profilePic, setProfilePic] = useState<string | null>(() => localStorage.getItem('profilePic'));
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form states initialized with localStorage defaults
  const [displayName, setDisplayName] = useState(() => localStorage.getItem('displayName') || 'Archit Prajapati');
  const [email, setEmail] = useState(() => localStorage.getItem('email') || 'archit@example.com');
  const [currency, setCurrency] = useState(() => localStorage.getItem('currency') || 'INR');

  // Functional states using localStorage for persistence
  const [darkMode, setDarkModeState] = useState(() => JSON.parse(localStorage.getItem('darkMode') || 'true'));
  const [emailUpdates, setEmailUpdatesState] = useState(() => JSON.parse(localStorage.getItem('emailUpdates') || 'true'));
  const [expenseAlerts, setExpenseAlertsState] = useState(() => JSON.parse(localStorage.getItem('expenseAlerts') || 'true'));
  const [twoFactorAuth, setTwoFactorAuthState] = useState(() => JSON.parse(localStorage.getItem('twoFactorAuth') || 'false'));

  const setDarkMode = (val: boolean) => { setDarkModeState(val); localStorage.setItem('darkMode', JSON.stringify(val)); };
  const setEmailUpdates = (val: boolean) => { setEmailUpdatesState(val); localStorage.setItem('emailUpdates', JSON.stringify(val)); };
  const setExpenseAlerts = (val: boolean) => { setExpenseAlertsState(val); localStorage.setItem('expenseAlerts', JSON.stringify(val)); };
  const setTwoFactorAuth = (val: boolean) => { setTwoFactorAuthState(val); localStorage.setItem('twoFactorAuth', JSON.stringify(val)); };

  const [saveSuccess, setSaveSuccess] = useState(false);

  // Handle local file preview and save to localStorage as Base64
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfilePic(base64String);
        localStorage.setItem('profilePic', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    localStorage.removeItem('profilePic');
    setProfilePic(null);
  };

  const handleSaveChanges = () => {
    localStorage.setItem('displayName', displayName);
    localStorage.setItem('email', email);
    localStorage.setItem('currency', currency);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
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
                  {profilePic ? (
                    <img src={profilePic} alt="Avatar Preview" className="w-full h-full object-cover" />
                  ) : (
                    <UserCircle className="w-12 h-12 text-gray-400" />
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
                <h3 className="text-xl font-bold text-white">{displayName}</h3>
                <p className="text-gray-400 text-sm mb-4">Update your photo and personal details.</p>
                <div className="flex flex-wrap items-center gap-3">
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="text-sm font-medium px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    Change Picture
                  </button>
                  {profilePic && (
                    <button 
                      onClick={handleRemovePhoto} 
                      className="text-sm font-medium px-4 py-2 bg-gray-700 hover:bg-red-600 text-white rounded-lg transition-colors"
                    >
                      Remove Photo
                    </button>
                  )}
                </div>
              </div>
            </div>

            <hr className="border-gray-700" />

            {/* Personal Details Form */}
            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <UserCircle className="w-4 h-4 text-gray-500" /> Display Name
                </label>
                <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full py-3 px-4 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" /> Email Address
                </label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full py-3 px-4 bg-gray-900 border border-gray-700 rounded-xl text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-500" /> Currency Preference
                </label>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full py-3 px-4 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none transition-all">
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
            </div>
            
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <button 
                onClick={handleSaveChanges}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors w-full sm:w-auto shadow-lg shadow-blue-500/20">
                Save Changes
              </button>
              {saveSuccess && (
                <span className="text-emerald-400 font-medium text-sm animate-pulse">Settings saved successfully!</span>
              )}
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
              <Toggle enabled={darkMode} setEnabled={setDarkMode} />
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
              <Toggle enabled={emailUpdates} setEnabled={setEmailUpdates} />
            </div>
            <hr className="border-gray-700" />
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-medium text-white">Expense Alerts</p><p className="text-xs text-gray-400 mt-0.5">When over budget</p></div>
              <Toggle enabled={expenseAlerts} setEnabled={setExpenseAlerts} />
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
              <Toggle enabled={twoFactorAuth} setEnabled={setTwoFactorAuth} />
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