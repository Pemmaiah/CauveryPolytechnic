import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { SliderItem } from '../../types';
import { ImageUploader } from '../../components/common/ImageUploader';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { 
  Sliders, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  Move, 
  Check, 
  X, 
  Sparkles, 
  Film,
  Layers
} from 'lucide-react';

export const AdminSliderManager: React.FC = () => {
  const { sliders, addSlider, updateSlider, deleteSlider } = useCMS();
  const [editingSlide, setEditingSlide] = useState<Partial<SliderItem> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const sortedSliders = [...sliders].sort((a, b) => a.displayOrder - b.displayOrder);

  const handleAddNew = () => {
    setIsNew(true);
    setEditingSlide({
      title: 'New Campus Highlight',
      subtitle: 'ADMISSIONS 2026-27',
      description: 'Experience technical education excellence in the scenic campus of South Kodagu.',
      imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80',
      mediaType: 'image',
      buttonText: 'Explore Programmes',
      buttonUrl: '/programmes',
      secondaryButtonText: 'Apply Online',
      secondaryButtonUrl: '/admission',
      animationType: 'kenburns',
      animationDuration: 14,
      slideDuration: 7,
      overlayOpacity: 0.6,
      textPosition: 'left',
      displayOrder: sliders.length + 1,
      active: true
    });
  };

  const handleEdit = (slide: SliderItem) => {
    setIsNew(false);
    setEditingSlide({ ...slide });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlide || !editingSlide.title || !editingSlide.imageUrl) {
      alert('Please provide slide title and image.');
      return;
    }

    setSaving(true);
    try {
      if (isNew) {
        await addSlider(editingSlide as Omit<SliderItem, 'id'>);
      } else if (editingSlide.id) {
        await updateSlider(editingSlide.id, editingSlide);
      }
      setEditingSlide(null);
    } catch (err) {
      console.error('Error saving slide:', err);
      alert('Failed to save slide.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteTargetId) {
      await deleteSlider(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-6 h-6 text-amber-500" />
            <h2 className="text-xl font-bold text-slate-900 font-serif">Cinematic Hero Slider Manager</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Configure video-style background motion (Ken Burns, Pan, Zoom, Scale), overlay darkness, and sequenced call-to-actions.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="px-4 py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Slide</span>
        </button>
      </div>

      {/* Sliders Grid / List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedSliders.map((slide) => (
          <div
            key={slide.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            {/* Preview Banner */}
            <div className="relative h-44 bg-slate-950 overflow-hidden group">
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div
                className="absolute inset-0 bg-slate-950"
                style={{ opacity: slide.overlayOpacity ?? 0.6 }}
              />

              {/* Order and Active Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2 py-0.5 bg-slate-900/80 backdrop-blur-xs text-white font-mono text-[10px] font-bold rounded">
                  #{slide.displayOrder}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    slide.active ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                  }`}
                >
                  {slide.active ? 'Active' : 'Inactive'}
                </span>
              </div>

              {/* Motion Tag */}
              <div className="absolute top-3 right-3 px-2 py-0.5 bg-amber-500 text-slate-950 text-[10px] font-bold uppercase rounded font-mono">
                {slide.animationType || 'kenburns'}
              </div>

              {/* Text Preview Overlay */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                {slide.subtitle && (
                  <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest block">
                    {slide.subtitle}
                  </span>
                )}
                <h4 className="text-xs font-bold truncate font-serif">{slide.title}</h4>
              </div>
            </div>

            {/* Slide Body */}
            <div className="p-4 flex-1 flex flex-col justify-between text-xs">
              <div className="space-y-1 text-slate-600">
                <p className="line-clamp-2">{slide.description}</p>
                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Duration: {slide.slideDuration || 7}s</span>
                  <span>Align: {slide.textPosition || 'left'}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleEdit(slide)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 text-blue-900 rounded-lg font-bold text-[11px] flex items-center gap-1 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setDeleteTargetId(slide.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Slide"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Edit / Create Modal */}
      {editingSlide && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Film className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-bold text-slate-900 font-serif">
                  {isNew ? 'Create New Hero Slide' : 'Edit Hero Slide'}
                </h3>
              </div>
              <button
                onClick={() => setEditingSlide(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5 text-xs">
              {/* Media Selection */}
              <ImageUploader
                label="Slide Background Image"
                currentUrl={editingSlide.imageUrl}
                onImageUploaded={(url) => setEditingSlide({ ...editingSlide, imageUrl: url })}
                storagePath="sliders"
                required
              />

              {/* Title & Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Slide Headline Title *</label>
                  <input
                    type="text"
                    required
                    value={editingSlide.title || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subtitle Badge</label>
                  <input
                    type="text"
                    value={editingSlide.subtitle || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, subtitle: e.target.value })}
                    placeholder="e.g. ADMISSIONS 2026-27"
                    className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingSlide.description || ''}
                  onChange={(e) => setEditingSlide({ ...editingSlide, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
                />
              </div>

              {/* Motion & Cinematic Animation Configurations */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Cinematic Motion & Video Styling</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Animation Effect</label>
                    <select
                      value={editingSlide.animationType || 'kenburns'}
                      onChange={(e) =>
                        setEditingSlide({
                          ...editingSlide,
                          animationType: e.target.value as SliderItem['animationType']
                        })
                      }
                      className="w-full px-3 py-2 bg-white border rounded-xl font-medium"
                    >
                      <option value="kenburns">Ken Burns Slow Zoom & Pan</option>
                      <option value="zoom-in">Slow Zoom In</option>
                      <option value="zoom-out">Slow Zoom Out</option>
                      <option value="pan-left">Pan Smooth Left</option>
                      <option value="pan-right">Pan Smooth Right</option>
                      <option value="pan-up">Pan Smooth Up</option>
                      <option value="pan-down">Pan Smooth Down</option>
                      <option value="cinematic-scale">Cinematic Scale</option>
                      <option value="fade">Subtle Drift Fade</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Slide Duration (Sec)</label>
                    <input
                      type="number"
                      min="4"
                      max="30"
                      value={editingSlide.slideDuration || 7}
                      onChange={(e) =>
                        setEditingSlide({ ...editingSlide, slideDuration: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 bg-white border rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Overlay Darkness ({editingSlide.overlayOpacity ?? 0.6})</label>
                    <input
                      type="range"
                      min="0.1"
                      max="0.9"
                      step="0.05"
                      value={editingSlide.overlayOpacity ?? 0.6}
                      onChange={(e) =>
                        setEditingSlide({ ...editingSlide, overlayOpacity: parseFloat(e.target.value) })
                      }
                      className="w-full mt-2"
                    />
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block font-bold text-slate-700">Primary Button Text & URL</label>
                  <input
                    type="text"
                    value={editingSlide.buttonText || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, buttonText: e.target.value })}
                    placeholder="Button Label (e.g. Apply Now)"
                    className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
                  />
                  <input
                    type="text"
                    value={editingSlide.buttonUrl || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, buttonUrl: e.target.value })}
                    placeholder="URL (e.g. /admission)"
                    className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-bold text-slate-700">Secondary Button Text & URL</label>
                  <input
                    type="text"
                    value={editingSlide.secondaryButtonText || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, secondaryButtonText: e.target.value })}
                    placeholder="Button Label (e.g. View Courses)"
                    className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
                  />
                  <input
                    type="text"
                    value={editingSlide.secondaryButtonUrl || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, secondaryButtonUrl: e.target.value })}
                    placeholder="URL (e.g. /programmes)"
                    className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
                  />
                </div>
              </div>

              {/* Status & Order */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={editingSlide.displayOrder ?? 1}
                    onChange={(e) => setEditingSlide({ ...editingSlide, displayOrder: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Text Alignment</label>
                  <select
                    value={editingSlide.textPosition || 'left'}
                    onChange={(e) => setEditingSlide({ ...editingSlide, textPosition: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
                  >
                    <option value="left">Left Aligned</option>
                    <option value="center">Center Aligned</option>
                    <option value="right">Right Aligned</option>
                  </select>
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingSlide.active ?? true}
                      onChange={(e) => setEditingSlide({ ...editingSlide, active: e.target.checked })}
                      className="w-4 h-4 rounded text-blue-950"
                    />
                    <span className="font-bold text-slate-800">Slide is Active</span>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-6 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingSlide(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold uppercase tracking-wider shadow-md disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Slide'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmationModal
        isOpen={deleteTargetId !== null}
        title="Delete Hero Slide"
        message="Are you sure you want to delete this slide? This action cannot be undone."
        confirmText="Delete Slide"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
