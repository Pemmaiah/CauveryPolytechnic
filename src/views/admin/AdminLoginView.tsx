import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Lock, User, GraduationCap, ShieldCheck, AlertCircle, Eye, EyeOff, KeyRound, Check } from 'lucide-react';

interface AdminLoginViewProps {
  onLoginSuccess: () => void;
  onNavigateHome: () => void;
}

export const AdminLoginView: React.FC<AdminLoginViewProps> = ({ onLoginSuccess, onNavigateHome }) => {
  const { login, loginAsDemoAdmin, adminCredentials, error } = useAuth();
  const [identifier, setIdentifier] = useState('admincpg');
  const [password, setPassword] = useState('Test@123@');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setLoading(true);

    try {
      await login(identifier, password);
      onLoginSuccess();
    } catch (err: any) {
      setLocalError(err.message || 'Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = () => {
    setIdentifier(adminCredentials.username || 'admincpg');
    setPassword(adminCredentials.password || 'Test@123@');
    setLocalError(null);
  };

  const handleDemoLogin = async () => {
    await loginAsDemoAdmin();
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="w-16 h-16 rounded-2xl bg-blue-900 border-2 border-amber-500 shadow-xl flex items-center justify-center mx-auto mb-4 text-white">
          <GraduationCap className="w-9 h-9 text-amber-400" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif tracking-tight">
          Admin CMS Portal
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-amber-400 font-semibold uppercase tracking-wider">
          Cauvery Polytechnic, Gonikoppal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl shadow-2xl border border-slate-100 space-y-6">
          
          {/* Credentials Info Badge */}
          <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl flex items-start justify-between gap-3 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-blue-950">
                <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                <span>Admin Login Credentials</span>
              </div>
              <div className="text-[11px] text-slate-700 font-mono space-y-0.5">
                <p>Username: <strong className="text-blue-900 bg-white px-1.5 py-0.5 rounded border border-blue-100">{adminCredentials.username || 'admincpg'}</strong></p>
                <p>Password: <strong className="text-blue-900 bg-white px-1.5 py-0.5 rounded border border-blue-100">{adminCredentials.password || 'Test@123@'}</strong></p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleQuickFill}
              className="px-2.5 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-bold text-[10px] tracking-wide transition-colors shrink-0 shadow-xs cursor-pointer"
            >
              Auto-Fill
            </button>
          </div>

          {(error || localError) && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{localError || error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Admin Username or Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="admincpg"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 text-slate-800 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Test@123@"
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 text-slate-800 font-mono text-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Lock className="w-4 h-4 text-amber-400" />
              <span>{loading ? 'Authenticating...' : 'Sign in as Admin'}</span>
            </button>
          </form>

          {/* Instant 1-Click Demo Login Helper */}
          <div className="pt-4 border-t border-slate-100">
            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Quick Access</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-tight">
                Click below to instantly access the WordPress-style Admin CMS Dashboard:
              </p>
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-xs cursor-pointer"
              >
                1-Click Direct Sign In
              </button>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={onNavigateHome}
              className="text-xs font-semibold text-slate-500 hover:text-blue-950 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>← Back to College Public Website</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
