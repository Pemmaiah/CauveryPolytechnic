import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { TickerItem } from '../../types';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { 
  Zap, 
  Plus, 
  Edit2, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  CheckCircle, 
  XCircle, 
  ExternalLink, 
  Flame, 
  Sparkles,
  Link as LinkIcon,
  Tag,
  Eye,
  Megaphone,
  Check
} from 'lucide-react';

export const AdminTickerManager: React.FC = () => {
  const { ticker, saveTicker, deleteTicker } = useCMS();
  const [editingItem, setEditingItem] = useState<Partial<TickerItem> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Sorted ticker items by order
  const sortedItems = [...ticker].sort((a, b) => (a.order || 0) - (b.order || 0));

  const handleAddNew = () => {
    setIsNew(true);
    setEditingItem({
      text: 'Admissions Open for Academic Year 2026-27 | Apply Online for Diploma Engineering',
      link: '/admission',
      badge: 'ADMISSION 2026',
      active: true,
      order: sortedItems.length + 1,
      isFlash: true
    });
  };

  const handleEdit = (item: TickerItem) => {
    setIsNew(false);
    setEditingItem({ ...item });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.text) {
      alert('Please provide announcement text.');
      return;
    }

    setSaving(true);
    try {
      await saveTicker(editingItem);
      setEditingItem(null);
    } catch (err) {
      console.error('Error saving ticker item:', err);
      alert('Failed to save ticker item.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteTargetId) {
      await deleteTicker(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  const handleToggleActive = async (item: TickerItem) => {
    await saveTicker({ ...item, active: !item.active });
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sortedItems.length) return;

    const currentItem = sortedItems[index];
    const targetItem = sortedItems[targetIndex];

    const currentOrder = currentItem.order || index + 1;
    const targetOrder = targetItem.order || targetIndex + 1;

    // Swap orders
    await saveTicker({ ...currentItem, order: targetOrder });
    await saveTicker({ ...targetItem, order: currentOrder });
  };

  const presets = [
    { text: 'Admissions Open for Diploma 2026-27 | 3-Year Technical Engineering Streams', link: '/admission', badge: 'ADMISSION' },
    { text: 'Karnataka DTE Examination Timetable & Hall Tickets Released (DTE Code: 494)', link: '/aicte', badge: 'EXAM NOTICE' },
    { text: 'SSP & NSP State Government Scholarships: Submit Verification Documents', link: '/pages/fee-structure', badge: 'SCHOLARSHIP' },
    { text: 'Annual State-Level Technical Symposium & Project Expo 2026 Registrations Active', link: '/events', badge: 'EVENT' },
    { text: 'Campus Placements 2026: 85+ Offers from Leading Engineering Multinational Companies', link: '/pages/placement-cell', badge: 'PLACEMENT' }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-rose-100 text-rose-700 rounded-xl">
              <Zap className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">Flash News & Scrolling Ticker</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Manage high-visibility scrolling announcements and flashing alerts displayed right above the hero slider.
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all shrink-0"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Add New Flash Ticker</span>
        </button>
      </div>

      {/* Live Preview of Flash Ticker */}
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider">
          <span className="flex items-center gap-1.5 text-amber-400">
            <Eye className="w-3.5 h-3.5" />
            <span>Public Appearance Preview (Displayed Above Hero Slider)</span>
          </span>
          <span>{sortedItems.filter((i) => i.active).length} Active Alerts</span>
        </div>

        {/* Mock Flash Bar */}
        <div className="w-full bg-linear-to-r from-slate-950 via-blue-950 to-slate-950 text-white rounded-xl border border-amber-500/40 p-2 flex items-center gap-3 overflow-hidden shadow-inner">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-linear-to-r from-rose-600 to-amber-600 text-white font-extrabold text-[11px] rounded-md uppercase tracking-wider shrink-0 shadow-xs">
            <Zap className="w-3 h-3 text-yellow-300 fill-yellow-300 animate-bounce" />
            <span>FLASH NEWS</span>
          </div>

          <div className="flex-1 overflow-hidden whitespace-nowrap text-xs text-slate-200 font-medium">
            {sortedItems.filter((i) => i.active).length > 0 ? (
              <div className="inline-flex items-center gap-6 animate-marquee py-0.5">
                {sortedItems.filter((i) => i.active).map((item, idx) => (
                  <span key={idx} className="inline-flex items-center gap-2">
                    {item.badge && (
                      <span className="px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 font-bold text-[9px]">
                        {item.badge}
                      </span>
                    )}
                    <span>{item.text}</span>
                    <span className="text-amber-400/60 font-bold">★</span>
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-slate-400 italic">No active ticker items enabled.</span>
            )}
          </div>
        </div>
      </div>

      {/* Quick Presets */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Quick 1-Click Announcement Presets</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset, i) => (
            <button
              key={i}
              onClick={() => {
                setIsNew(true);
                setEditingItem({
                  text: preset.text,
                  link: preset.link,
                  badge: preset.badge,
                  active: true,
                  order: sortedItems.length + 1,
                  isFlash: true
                });
              }}
              className="text-left px-3 py-2 bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 rounded-xl text-xs text-slate-700 transition-colors flex items-center gap-2 group"
            >
              <span className="px-1.5 py-0.5 bg-slate-200 group-hover:bg-amber-500 group-hover:text-slate-950 font-bold text-[9px] rounded uppercase">
                {preset.badge}
              </span>
              <span className="truncate max-w-xs">{preset.text}</span>
              <Plus className="w-3 h-3 text-slate-400 group-hover:text-amber-700 shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Ticker Items List */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Configured Flash Ticker Items ({sortedItems.length})</h2>
          <span className="text-xs text-slate-500">Order from Top to Bottom defines scrolling sequence</span>
        </div>

        {sortedItems.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Megaphone className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p className="font-semibold text-slate-600">No ticker announcements found.</p>
            <p className="text-xs mt-1">Click "Add New Flash Ticker" to publish your first announcement.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {sortedItems.map((item, idx) => (
              <div 
                key={item.id || idx}
                className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                  item.active ? 'hover:bg-slate-50/80' : 'bg-slate-50/40 opacity-70'
                }`}
              >
                {/* Left info */}
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center gap-1 mt-0.5">
                    <button
                      onClick={() => handleMove(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1 rounded hover:bg-slate-200 text-slate-400 disabled:opacity-30 transition-colors"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] font-bold text-slate-400">{idx + 1}</span>
                    <button
                      onClick={() => handleMove(idx, 'down')}
                      disabled={idx === sortedItems.length - 1}
                      className="p-1 rounded hover:bg-slate-200 text-slate-400 disabled:opacity-30 transition-colors"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {item.badge && (
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-[10px] uppercase">
                          {item.badge}
                        </span>
                      )}
                      {item.isFlash && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 font-bold text-[9px] uppercase">
                          <Zap className="w-2.5 h-2.5 fill-rose-600 text-rose-600" />
                          <span>FLASH</span>
                        </span>
                      )}
                      <span className={`text-xs font-bold ${item.active ? 'text-emerald-700' : 'text-slate-400'}`}>
                        {item.active ? '● Active' : '○ Hidden'}
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-slate-900 leading-snug">
                      {item.text}
                    </p>

                    {item.link && (
                      <div className="flex items-center gap-1.5 text-xs text-blue-800 font-medium">
                        <LinkIcon className="w-3 h-3 text-slate-400" />
                        <span>Link: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-blue-900 font-mono text-[11px]">{item.link}</code></span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => handleToggleActive(item)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      item.active 
                        ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    {item.active ? 'Active' : 'Enable'}
                  </button>

                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 text-blue-900 hover:bg-blue-50 rounded-xl border border-slate-200 transition-colors"
                    title="Edit Ticker Item"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setDeleteTargetId(item.id)}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl border border-slate-200 transition-colors"
                    title="Delete Ticker Item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit / Create Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-rose-100 text-rose-700 rounded-xl">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  {isNew ? 'Create Flash News / Ticker' : 'Edit Flash News Announcement'}
                </h3>
              </div>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Announcement Headline / Marquee Text *
                </label>
                <textarea
                  value={editingItem.text || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, text: e.target.value })}
                  rows={3}
                  required
                  placeholder="e.g. Admissions Open for 2026-27 | 3-Year Diploma in CSE, ME, Civil & ECE..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-hidden text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Category / Tag Badge
                  </label>
                  <input
                    type="text"
                    value={editingItem.badge || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, badge: e.target.value })}
                    placeholder="e.g. ADMISSION, EXAM, EVENT, SCHOLARSHIP"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-hidden text-sm"
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {['ADMISSION', 'EXAM NOTICE', 'SCHOLARSHIP', 'PLACEMENT', 'EVENT', 'CIRCULAR', 'URGENT'].map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setEditingItem({ ...editingItem, badge: tag })}
                        className="px-2 py-0.5 bg-slate-100 hover:bg-amber-100 text-slate-700 text-[10px] font-bold rounded"
                      >
                        +{tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Click Link / Destination URL
                  </label>
                  <input
                    type="text"
                    value={editingItem.link || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, link: e.target.value })}
                    placeholder="e.g. /admission or /events or https://..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-hidden text-sm"
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {[
                      { l: '/admission', name: 'Admission' },
                      { l: '/events', name: 'Events' },
                      { l: '/aicte', name: 'AICTE' },
                      { l: '/pages/fee-structure', name: 'Fees' },
                      { l: '/news', name: 'News' }
                    ].map((dest) => (
                      <button
                        key={dest.l}
                        type="button"
                        onClick={() => setEditingItem({ ...editingItem, link: dest.l })}
                        className="px-2 py-0.5 bg-slate-100 hover:bg-blue-100 text-blue-900 text-[10px] font-bold rounded"
                      >
                        {dest.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingItem.isFlash ?? true}
                    onChange={(e) => setEditingItem({ ...editingItem, isFlash: e.target.checked })}
                    className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Flash / High-Priority Alert</span>
                    <span className="text-[11px] text-slate-500">Highlights item with pulsing glow indicator</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingItem.active ?? true}
                    onChange={(e) => setEditingItem({ ...editingItem, active: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Active Status</span>
                    <span className="text-[11px] text-slate-500">Visible in public scrolling ticker</span>
                  </div>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  {saving ? (
                    <span>Saving...</span>
                  ) : (
                    <>
                      <Check className="w-4 h-4 text-amber-400" />
                      <span>{isNew ? 'Create Ticker Alert' : 'Save Changes'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <ConfirmationModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Ticker Alert"
        message="Are you sure you want to permanently remove this scrolling announcement? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
