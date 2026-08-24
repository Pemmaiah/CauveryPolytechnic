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
  Shield,
  Type,
  Image as ImageIcon,
  Layers,
  Sparkles,
  GraduationCap,
  Sliders,
  Check
} from 'lucide-react';

export const AdminSettingsManager: React.FC = () => {
  const { settings, updateSettings } = useCMS();
  const { adminCredentials, updateAdminCredentials } = useAuth();
  
  // Institutional Settings Form State
  const [formData, setFormData] = useState<CollegeSettings>({
    logoDisplayMode: 'both',
    logoHeight: 56,
    logoShape: 'rounded',
    ...settings
  });
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
      setTimeout(() => setSavedSuccess(false), 3500);
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

  const currentMode = formData.logoDisplayMode || 'both';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-6 h-6 text-amber-500" />
            <h2 className="text-xl font-bold text-slate-900 font-serif">College & Brand Identity Settings</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Configure institutional logo upload & display mode (Text only, Logo only, or Both), contact information, and principal desk.
          </p>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-xl flex items-center gap-2 border border-emerald-200 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Settings Successfully Saved!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* LOGO & BRAND HEADER DISPLAY MODE CONFIGURATION */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-blue-900/20 shadow-md space-y-6 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-950 text-amber-400 flex items-center justify-center font-bold shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-serif">
                  Institutional Logo & Brand Display Options
                </h3>
                <p className="text-xs text-slate-500">
                  Select how the college identity is rendered in the top header and public navigation.
                </p>
              </div>
            </div>

            <div className="px-3 py-1 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 font-bold text-[11px]">
              Active Mode: <span className="uppercase text-blue-950">{currentMode.replace('_', ' ')}</span>
            </div>
          </div>

          {/* 3 Display Mode Choices */}
          <div>
            <label className="block font-bold text-slate-800 text-xs mb-2.5 uppercase tracking-wider">
              1. Choose Brand Header Presentation Mode (All 3 Options Available):
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Option 1: Both (Logo + Text) */}
              <div
                onClick={() => setFormData({ ...formData, logoDisplayMode: 'both' })}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all relative flex flex-col justify-between ${
                  currentMode === 'both'
                    ? 'border-blue-900 bg-blue-50/60 shadow-md ring-2 ring-blue-900/20'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-900 text-amber-400 flex items-center justify-center">
                      <Layers className="w-5 h-5" />
                    </div>
                    {currentMode === 'both' && (
                      <span className="w-5 h-5 rounded-full bg-blue-900 text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 font-serif">Logo + College Text</h4>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                    Displays both the official emblem/seal image on the left and full college typography on the right.
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-slate-200/60 text-[10px] font-bold text-blue-900 uppercase tracking-wider">
                  Recommended for Colleges
                </div>
              </div>

              {/* Option 2: Logo Only */}
              <div
                onClick={() => setFormData({ ...formData, logoDisplayMode: 'logo_only' })}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all relative flex flex-col justify-between ${
                  currentMode === 'logo_only'
                    ? 'border-blue-900 bg-blue-50/60 shadow-md ring-2 ring-blue-900/20'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    {currentMode === 'logo_only' && (
                      <span className="w-5 h-5 rounded-full bg-blue-900 text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 font-serif">Logo Only</h4>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                    Displays purely the uploaded institutional emblem banner/crest without supplementary heading text.
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-slate-200/60 text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                  Minimalist & Crest Centric
                </div>
              </div>

              {/* Option 3: Text Only */}
              <div
                onClick={() => setFormData({ ...formData, logoDisplayMode: 'text_only' })}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all relative flex flex-col justify-between ${
                  currentMode === 'text_only'
                    ? 'border-blue-900 bg-blue-50/60 shadow-md ring-2 ring-blue-900/20'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-800 text-white flex items-center justify-center">
                      <Type className="w-5 h-5" />
                    </div>
                    {currentMode === 'text_only' && (
                      <span className="w-5 h-5 rounded-full bg-blue-900 text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 font-serif">College Text Only</h4>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                    Displays high-contrast institutional typography, ESTD. badge, and affiliation tagline with no emblem.
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-slate-200/60 text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                  Clean Typographic Header
                </div>
              </div>
            </div>
          </div>

          {/* Logo Uploader & Presets */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
            <div className="space-y-4">
              <label className="block font-bold text-slate-800 text-xs uppercase tracking-wider">
                2. Upload Official Logo / Emblem Image:
              </label>

              <ImageUploader
                value={formData.logo}
                onChange={(url) => setFormData({ ...formData, logo: url })}
                label="Institution Official Logo File"
                helperText="Upload PNG with transparent background, SVG, or JPG (Recommended: 400x400px or banner format)."
                folder="logos"
              />

              {/* Quick Sample Crest / Logo Presets */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-600 block mb-2">
                  Or select a standard institutional emblem template:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=300&q=80'
                      });
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-100 text-slate-800 text-xs font-semibold border border-slate-200 transition-colors flex items-center gap-1.5"
                  >
                    <Shield className="w-3.5 h-3.5 text-blue-900" />
                    <span>Technical Shield Emblem</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        logo: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=300&q=80'
                      });
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-800 text-xs font-semibold border border-slate-200 transition-colors flex items-center gap-1.5"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
                    <span>Academic Seal Crest</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        logo: ''
                      });
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold border border-slate-200 transition-colors"
                  >
                    Reset to Default Icon
                  </button>
                </div>
              </div>
            </div>

            {/* LIVE HEADER PREVIEW BOX */}
            <div className="space-y-3">
              <label className="block font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-900" />
                <span>3. Live Header Preview (How Visitors See It):</span>
              </label>

              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-inner flex flex-col justify-between min-h-[160px]">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[10px] text-slate-400 font-mono">
                  <span>PUBLIC NAVBAR PREVIEW</span>
                  <span className="text-amber-400 font-bold uppercase">{currentMode.replace('_', ' ')}</span>
                </div>

                <div className="py-4">
                  {/* Live Render in Header Preview */}
                  <div className="flex items-center gap-3.5 select-none">
                    {/* Emblem (Rendered if 'both' or 'logo_only') */}
                    {currentMode !== 'text_only' && (
                      <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-blue-900 via-blue-950 to-slate-900 border-2 border-amber-500 shadow-md flex items-center justify-center text-white shrink-0 overflow-hidden">
                        {formData.logo ? (
                          <img
                            src={formData.logo}
                            alt="College Logo"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <GraduationCap className="w-7 h-7 text-amber-400" />
                        )}
                      </div>
                    )}

                    {/* Text Details (Rendered if 'both' or 'text_only') */}
                    {currentMode !== 'logo_only' && (
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base sm:text-lg font-extrabold tracking-tight text-white uppercase font-serif">
                            {formData.collegeName || 'Cauvery Polytechnic'}
                          </h4>
                          <span className="bg-amber-400 text-slate-950 text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                            ESTD. KODAGU
                          </span>
                        </div>
                        <p className="text-[11px] font-semibold text-amber-400 uppercase tracking-wide">
                          Gonikoppal, South Kodagu, Karnataka
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {formData.affiliation || 'Approved by AICTE, New Delhi & Affiliated to DTE Bengaluru'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500 flex items-center justify-between">
                  <span>DTE Code: {formData.dsaCode || '494'}</span>
                  <span>AICTE Approved</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Logo Height (px)</label>
                  <input
                    type="number"
                    min={40}
                    max={96}
                    value={formData.logoHeight || 56}
                    onChange={(e) => setFormData({ ...formData, logoHeight: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 bg-slate-50 border rounded-xl font-bold text-blue-950"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Logo Corner Style</label>
                  <select
                    value={formData.logoShape || 'rounded'}
                    onChange={(e) => setFormData({ ...formData, logoShape: e.target.value as any })}
                    className="w-full px-3 py-1.5 bg-slate-50 border rounded-xl font-medium"
                  >
                    <option value="rounded">Rounded Box (16px)</option>
                    <option value="circle">Circular Crest</option>
                    <option value="square">Square</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl font-bold"
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
                value={formData.dsaCode || formData.dteCode || ''}
                onChange={(e) => setFormData({ ...formData, dsaCode: e.target.value, dteCode: e.target.value })}
                placeholder="494"
                className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Official Affiliation Subtitle</label>
              <input
                type="text"
                value={formData.affiliation || ''}
                onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                placeholder="Approved by AICTE, New Delhi & Affiliated to Directorate of Technical Education (DTE), Bengaluru"
                className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl"
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
              <label className="block font-bold text-slate-700 mb-1">Official College Email</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Campus Postal Address</label>
            <input
              type="text"
              value={formData.address || ''}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">District</label>
              <input
                type="text"
                value={formData.district || 'Kodagu'}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">State</label>
              <input
                type="text"
                value={formData.state || 'Karnataka'}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">PIN Code</label>
              <input
                type="text"
                value={formData.pincode || '571213'}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl"
              />
            </div>
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
                placeholder="e.g. Prof. K. B. Pemmaiah"
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl font-bold"
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
            value={formData.principalPhoto}
            onChange={(url) => setFormData({ ...formData, principalPhoto: url })}
            label="Principal Official Portrait Photograph"
            folder="principal"
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

        {/* Submit */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3.5 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4 text-amber-400" />
            <span>{saving ? 'Saving Settings...' : 'Save All Settings & Brand Options'}</span>
          </button>
        </div>
      </form>

      {/* Admin Security & Password Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-200/80 shadow-sm space-y-6 relative overflow-hidden mt-8">
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
              <label className="block font-bold text-slate-700 mb-1">Admin Username</label>
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
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Current Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showCurrentPass ? 'text' : 'password'}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPass(!showCurrentPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">New Password (Leave blank to keep unchanged)</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showNewPass ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password (min 6 characters)"
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Confirm New Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showConfirmPass ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
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
    </div>
  );
};
