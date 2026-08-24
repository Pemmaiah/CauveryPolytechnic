import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { useAuth } from '../../context/AuthContext';
import { CollegeSettings } from '../../types';
import { ImageUploader } from '../../components/common/ImageUploader';
import { 
  Settings, 
  Save, 
  CheckCircle2, 
  Building, 
  Phone, 
  User, 
  Award, 
  KeyRound, 
  ShieldCheck, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle,
  Shield
} from 'lucide-react';

export const AdminSettingsManager: React.FC = () => {
  const { settings, updateSettings } = useCMS();
  const { adminCredentials, updateAdminCredentials, updateAdminPassword } = useAuth();
  
  // Institutional Settings Form State
  const [formData, setFormData] = useState<CollegeSettings>({ ...settings });
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Security / Password Form State
  const [adminUsername, setAdminUsername] = useState(adminCredentials.username || 'admincpg');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [updatingSecurity, setUpdatingSecurity] = useState(false);
  const [securitySuccessMsg, setSecuritySuccessMsg] = useState<string | null>(null);
  const [securityErrorMsg, setSecurityErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      await updateSettings(formData);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to update settings:', err);
      alert('Failed to update settings.');
    } finally {
      setSaving(false);
    }
  };

  const handleSecuritySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityErrorMsg(null);
    setSecuritySuccessMsg(null);

    if (!currentPassword) {
      setSecurityErrorMsg('Please enter your current password to authorize changes.');
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setSecurityErrorMsg('New password and confirmation password do not match.');
      return;
    }

    if (newPassword && newPassword.length < 6) {
      setSecurityErrorMsg('New password must be at least 6 characters long.');
      return;
    }

    setUpdatingSecurity(true);
    try {
      const res = await updateAdminCredentials(
        adminUsername,
        currentPassword,
        newPassword || undefined
      );

      if (res.success) {
        setSecuritySuccessMsg(res.message);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setSecuritySuccessMsg(null), 5000);
      } else {
        setSecurityErrorMsg(res.message);
      }
    } catch (err: any) {
      setSecurityErrorMsg(err.message || 'Failed to update credentials.');
    } finally {
      setUpdatingSecurity(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-6 h-6 text-amber-500" />
            <h2 className="text-xl font-bold text-slate-900 font-serif">College & Security Settings</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Institutional configuration, contact details, Principal's desk, and Admin credentials & password management.
          </p>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-xl flex items-center gap-2 border border-emerald-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>Institutional Settings Saved!</span>
          </div>
        )}
      </div>

      {/* Admin Security & Password Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-200/80 shadow-sm space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm font-serif">
            <div className="p-2 bg-amber-500/10 text-amber-600 rounded-xl">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-serif">Admin Login Credentials & Password</h3>
              <p className="text-xs text-slate-500 font-sans font-normal">
                Update the administrator username and password for CMS access.
              </p>
            </div>
          </div>

          <div className="px-3 py-1 bg-slate-100 rounded-lg text-[11px] font-mono text-slate-600 self-start sm:self-auto border border-slate-200">
            Active: <strong className="text-blue-950 font-bold">{adminCredentials.username || 'admincpg'}</strong>
          </div>
        </div>

        {securitySuccessMsg && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{securitySuccessMsg}</span>
          </div>
        )}

        {securityErrorMsg && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2 font-medium">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{securityErrorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSecuritySubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Admin Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  placeholder="admincpg"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Default: admincpg</span>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Current Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showCurrentPass ? 'text' : 'password'}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password (e.g. Test@123@)"
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPass(!showCurrentPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5"
                >
                  {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Required to verify changes</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                New Password (Optional, leave blank to keep current)
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showNewPass ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password (min. 6 characters)"
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5"
                >
                  {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <Shield className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showConfirmPass ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type new password"
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5"
                >
                  {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end pt-2">
            <button
              type="submit"
              disabled={updatingSecurity}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{updatingSecurity ? 'Updating Credentials...' : 'Update Admin Credentials'}</span>
            </button>
          </div>
        </form>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* Basic Institution Identifiers */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm font-serif">
            <Building className="w-4 h-4 text-blue-900" />
            <span>Institutional Identity & Accreditation Codes</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">College Name</label>
              <input
                type="text"
                required
                value={formData.collegeName || ''}
                onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Parent Trust / Society Name</label>
              <input
                type="text"
                value={formData.trustName || ''}
                onChange={(e) => setFormData({ ...formData, trustName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">AICTE Permanent Institute ID</label>
              <input
                type="text"
                value={formData.aicteCode || ''}
                onChange={(e) => setFormData({ ...formData, aicteCode: e.target.value })}
                placeholder="1-9988776655"
                className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">DTE Karnataka Institute Code</label>
              <input
                type="text"
                value={formData.dteCode || ''}
                onChange={(e) => setFormData({ ...formData, dteCode: e.target.value })}
                placeholder="DTE-342"
                className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl font-mono"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm font-serif">
            <Phone className="w-4 h-4 text-blue-900" />
            <span>Contact Numbers, Email & Postal Address</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Primary Landline Phone</label>
              <input
                type="text"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Admissions Hotline Mobile</label>
              <input
                type="text"
                value={formData.mobile || ''}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Official Inquiry Email</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Full Campus Postal Address</label>
            <input
              type="text"
              value={formData.address || ''}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Google Maps Embed URL</label>
            <input
              type="text"
              value={formData.googleMapUrl || ''}
              onChange={(e) => setFormData({ ...formData, googleMapUrl: e.target.value })}
              placeholder="https://www.google.com/maps/embed?..."
              className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl font-mono text-[11px]"
            />
          </div>
        </div>

        {/* Principal's Desk */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm font-serif">
            <User className="w-4 h-4 text-blue-900" />
            <span>Principal's Desk Information</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Principal Full Name</label>
              <input
                type="text"
                value={formData.principalName || ''}
                onChange={(e) => setFormData({ ...formData, principalName: e.target.value })}
                placeholder="e.g. Prof. M. K. Bopanna"
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Academic Qualifications</label>
              <input
                type="text"
                value={formData.principalQualification || ''}
                onChange={(e) => setFormData({ ...formData, principalQualification: e.target.value })}
                placeholder="M.Tech (CAD/CAM), Ph.D., MISTE"
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl"
              />
            </div>
          </div>

          <ImageUploader
            label="Principal Official Portrait Photograph"
            currentUrl={formData.principalPhoto}
            onImageUploaded={(url) => setFormData({ ...formData, principalPhoto: url })}
            storagePath="principal"
          />

          <div>
            <label className="block font-bold text-slate-700 mb-1">Principal's Welcome Quote / Message</label>
            <textarea
              rows={3}
              value={formData.principalMessage || ''}
              onChange={(e) => setFormData({ ...formData, principalMessage: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl"
            />
          </div>
        </div>

        {/* Statistics Numbers */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm font-serif">
            <Award className="w-4 h-4 text-blue-900" />
            <span>Key Institutional Metric Counters</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Years of Excellence</label>
              <input
                type="number"
                value={formData.statsYears || 35}
                onChange={(e) => setFormData({ ...formData, statsYears: Number(e.target.value) })}
                className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl font-bold text-blue-950"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Alumni Placed</label>
              <input
                type="number"
                value={formData.statsAlumni || 12000}
                onChange={(e) => setFormData({ ...formData, statsAlumni: Number(e.target.value) })}
                className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl font-bold text-blue-950"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Placement Record (%)</label>
              <input
                type="number"
                value={formData.statsPlacementRate || 95}
                onChange={(e) => setFormData({ ...formData, statsPlacementRate: Number(e.target.value) })}
                className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl font-bold text-blue-950"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Qualified Faculty</label>
              <input
                type="number"
                value={formData.statsFaculty || 45}
                onChange={(e) => setFormData({ ...formData, statsFaculty: Number(e.target.value) })}
                className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl font-bold text-blue-950"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3.5 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4 text-amber-400" />
            <span>{saving ? 'Saving Settings...' : 'Save Institutional Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
