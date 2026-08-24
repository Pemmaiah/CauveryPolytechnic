import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { GalleryItem } from '../../types';
import { ImageUploader } from '../../components/common/ImageUploader';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { Images, Plus, Edit2, Trash2, X } from 'lucide-react';

export const AdminGalleryManager: React.FC = () => {
  const { gallery, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useCMS();
  const [editingItem, setEditingItem] = useState<Partial<GalleryItem> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const sortedGallery = [...gallery].sort((a, b) => a.displayOrder - b.displayOrder);

  const handleAddNew = () => {
    setIsNew(true);
    setEditingItem({
      title: 'Campus Life & Activities',
      category: 'Campus',
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      description: 'Students engaged in collaborative academic learning.',
      displayOrder: gallery.length + 1,
      active: true
    });
  };

  const handleEdit = (item: GalleryItem) => {
    setIsNew(false);
    setEditingItem({ ...item });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.title || !editingItem.imageUrl) {
      alert('Please provide title and image.');
      return;
    }

    setSaving(true);
    try {
      if (isNew) {
        await addGalleryItem(editingItem as Omit<GalleryItem, 'id' | 'createdAt'>);
      } else if (editingItem.id) {
        await updateGalleryItem(editingItem.id, editingItem);
      }
      setEditingItem(null);
    } catch (err) {
      console.error('Error saving gallery item:', err);
      alert('Failed to save gallery photo.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteTargetId) {
      await deleteGalleryItem(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Images className="w-6 h-6 text-rose-600" />
            <h2 className="text-xl font-bold text-slate-900 font-serif">Campus Photo Gallery</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Upload high-resolution campus photos, organize them by category tags, and arrange display order.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="px-4 py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Photo</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {sortedGallery.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="relative h-44 bg-slate-900 overflow-hidden">
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <span className="absolute top-2 left-2 bg-slate-900/80 text-amber-400 text-[10px] font-bold uppercase px-2 py-0.5 rounded backdrop-blur-xs">
                {item.category}
              </span>
            </div>

            <div className="p-3.5 flex-1 flex flex-col justify-between text-xs space-y-2">
              <div>
                <h4 className="font-bold text-slate-900 truncate">{item.title}</h4>
                {item.description && (
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{item.description}</p>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-mono">#{item.displayOrder}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-1 text-blue-900 hover:bg-blue-50 rounded"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteTargetId(item.id)}
                    className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 font-serif">
                {isNew ? 'Upload Campus Photo' : 'Edit Photo Metadata'}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <ImageUploader
                label="Select Photo"
                currentUrl={editingItem.imageUrl}
                onImageUploaded={(url) => setEditingItem({ ...editingItem, imageUrl: url })}
                storagePath="gallery"
                required
              />

              <div>
                <label className="block font-bold text-slate-700 mb-1">Photo Title / Caption *</label>
                <input
                  type="text"
                  required
                  value={editingItem.title || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category Tag</label>
                  <input
                    type="text"
                    value={editingItem.category || 'Campus'}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    placeholder="Campus, Labs, Sports, Cultural"
                    className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={editingItem.displayOrder ?? 1}
                    onChange={(e) => setEditingItem({ ...editingItem, displayOrder: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl"
                />
              </div>

              <div className="pt-6 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 font-bold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold uppercase tracking-wider"
                >
                  {saving ? 'Saving...' : 'Save Photo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <ConfirmationModal
        isOpen={deleteTargetId !== null}
        title="Delete Photo"
        message="Are you sure you want to delete this photo from the campus gallery?"
        confirmText="Delete Photo"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
