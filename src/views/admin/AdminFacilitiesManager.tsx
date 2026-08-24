import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { FacilityItem } from '../../types';
import { ImageUploader } from '../../components/common/ImageUploader';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { Building2, Plus, Edit2, Trash2, X } from 'lucide-react';

export const AdminFacilitiesManager: React.FC = () => {
  const { facilities, addFacility, updateFacility, deleteFacility } = useCMS();
  const [editingFac, setEditingFac] = useState<Partial<FacilityItem> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [featuresInput, setFeaturesInput] = useState('');

  const handleAddNew = () => {
    setIsNew(true);
    setEditingFac({
      title: 'Advanced Robotics & Automation Hub',
      icon: 'Cpu',
      category: 'Laboratories',
      shortDesc: 'Modern robotics laboratory equipped with pneumatic arms and microcontrollers.',
      fullDesc: 'State-of-the-art facility enabling students to build automated systems, PLC controls, and IoT industrial machinery.',
      images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'],
      features: ['6-Axis Robotic Arms', 'Industrial PLC Trainer Kits', 'Sensors & IoT Station'],
      displayOrder: facilities.length + 1,
      active: true
    });
    setFeaturesInput('6-Axis Robotic Arms\nIndustrial PLC Trainer Kits\nSensors & IoT Station');
  };

  const handleEdit = (fac: FacilityItem) => {
    setIsNew(false);
    setEditingFac({ ...fac });
    setFeaturesInput((fac.features || []).join('\n'));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFac || !editingFac.title) {
      alert('Please provide facility title.');
      return;
    }

    setSaving(true);
    try {
      const parsedFeatures = featuresInput
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        ...editingFac,
        features: parsedFeatures
      };

      if (isNew) {
        await addFacility(payload as Omit<FacilityItem, 'id'>);
      } else if (editingFac.id) {
        await updateFacility(editingFac.id, payload);
      }
      setEditingFac(null);
    } catch (err) {
      console.error('Error saving facility:', err);
      alert('Failed to save facility.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteTargetId) {
      await deleteFacility(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-6 h-6 text-amber-600" />
            <h2 className="text-xl font-bold text-slate-900 font-serif">Campus Facilities & Labs</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage computing centers, workshops, smart seminar halls, sports complexes, and hostel amenities.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="px-4 py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Facility</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((fac) => (
          <div
            key={fac.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="relative h-44 bg-slate-900 overflow-hidden">
              <img
                src={fac.images[0] || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80'}
                alt={fac.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 bg-blue-950 text-amber-400 text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                {fac.category}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between text-xs space-y-3">
              <div>
                <h3 className="font-bold text-blue-950 text-base font-serif">{fac.title}</h3>
                <p className="text-slate-500 line-clamp-2 mt-1">{fac.shortDesc}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleEdit(fac)}
                  className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-950 rounded-lg font-bold text-xs flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setDeleteTargetId(fac.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingFac && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 font-serif">
                {isNew ? 'Add Campus Facility' : `Edit Facility: ${editingFac.title}`}
              </h3>
              <button
                onClick={() => setEditingFac(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Facility Title *</label>
                  <input
                    type="text"
                    required
                    value={editingFac.title || ''}
                    onChange={(e) => setEditingFac({ ...editingFac, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={editingFac.category || 'Laboratories'}
                    onChange={(e) => setEditingFac({ ...editingFac, category: e.target.value })}
                    placeholder="Laboratories, Library, Workshops, Sports"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>
              </div>

              <ImageUploader
                label="Primary Facility Photo"
                currentUrl={editingFac.images?.[0]}
                onImageUploaded={(url) => setEditingFac({ ...editingFac, images: [url] })}
                storagePath="facilities"
                required
              />

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Description (for cards)</label>
                <textarea
                  rows={2}
                  value={editingFac.shortDesc || ''}
                  onChange={(e) => setEditingFac({ ...editingFac, shortDesc: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Detailed Description</label>
                <textarea
                  rows={3}
                  value={editingFac.fullDesc || ''}
                  onChange={(e) => setEditingFac({ ...editingFac, fullDesc: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Key Amenities / Features (1 per line)</label>
                <textarea
                  rows={3}
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl font-mono"
                />
              </div>

              <div className="pt-6 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingFac(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 font-bold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold uppercase tracking-wider"
                >
                  {saving ? 'Saving...' : 'Save Facility'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <ConfirmationModal
        isOpen={deleteTargetId !== null}
        title="Delete Facility"
        message="Are you sure you want to delete this facility record?"
        confirmText="Delete Facility"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
