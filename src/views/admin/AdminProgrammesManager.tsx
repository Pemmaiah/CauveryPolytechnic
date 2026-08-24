import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { ProgrammeItem } from '../../types';
import { ImageUploader } from '../../components/common/ImageUploader';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { GraduationCap, Plus, Edit2, Trash2, Clock, Users, X, Check } from 'lucide-react';

export const AdminProgrammesManager: React.FC = () => {
  const { programmes, addProgramme, updateProgramme, deleteProgramme } = useCMS();
  const [editingProg, setEditingProg] = useState<Partial<ProgrammeItem> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [highlightsInput, setHighlightsInput] = useState('');
  const [careersInput, setCareersInput] = useState('');

  const handleAddNew = () => {
    setIsNew(true);
    setEditingProg({
      name: 'Diploma in Artificial Intelligence & Machine Learning',
      code: 'D-AIML',
      duration: '3 Years (6 Semesters)',
      intake: 60,
      eligibility: 'Passed Karnataka SSLC / 10th Standard examination with minimum 35% aggregate marks.',
      description: 'Cutting-edge diploma curriculum training students in Python, Data Analytics, neural networks, and industrial automation.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      highlights: ['Specialized AI Computing Lab', 'Python & PyTorch Certification', '100% Placement Support'],
      careers: ['AI Technician', 'Junior Data Engineer', 'Robotics Programmer', 'Direct 2nd Year B.E./B.Tech'],
      hodName: 'Prof. K. N. Mandanna',
      hodMessage: 'Equipping our learners with future-ready AI engineering tools.',
      displayOrder: programmes.length + 1,
      active: true
    });
    setHighlightsInput('Specialized AI Computing Lab\nPython & PyTorch Certification\n100% Placement Support');
    setCareersInput('AI Technician, Junior Data Engineer, Robotics Programmer, Direct 2nd Year B.E./B.Tech');
  };

  const handleEdit = (p: ProgrammeItem) => {
    setIsNew(false);
    setEditingProg({ ...p });
    setHighlightsInput((p.highlights || []).join('\n'));
    setCareersInput((p.careers || []).join(', '));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProg || !editingProg.name || !editingProg.code) {
      alert('Please provide course name and code.');
      return;
    }

    setSaving(true);
    try {
      const parsedHighlights = highlightsInput
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
      const parsedCareers = careersInput
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        ...editingProg,
        highlights: parsedHighlights,
        careers: parsedCareers
      };

      if (isNew) {
        await addProgramme(payload as Omit<ProgrammeItem, 'id'>);
      } else if (editingProg.id) {
        await updateProgramme(editingProg.id, payload);
      }
      setEditingProg(null);
    } catch (err) {
      console.error('Error saving programme:', err);
      alert('Failed to save programme.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteTargetId) {
      await deleteProgramme(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-amber-600" />
            <h2 className="text-xl font-bold text-slate-900 font-serif">Diploma Engineering Programmes</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage course intake seats, eligibility, syllabus highlights, and departmental head messages.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="px-4 py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Course</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programmes.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="relative h-44 bg-slate-900 overflow-hidden">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute top-3 left-3 bg-blue-950 text-amber-400 font-mono text-xs font-bold px-2 py-0.5 rounded">
                {p.code}
              </div>
              <div className="absolute top-3 right-3">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    p.active ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                  }`}
                >
                  {p.active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between text-xs space-y-3">
              <div>
                <h3 className="font-bold text-blue-950 text-base font-serif">{p.name}</h3>
                <p className="text-slate-500 line-clamp-2 mt-1">{p.description}</p>
                <div className="flex items-center justify-between mt-3 text-slate-700 bg-slate-50 p-2.5 rounded-xl border">
                  <span>Duration: <strong>{p.duration}</strong></span>
                  <span>Intake: <strong>{p.intake}</strong></span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-lg font-bold text-xs flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setDeleteTargetId(p.id)}
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
      {editingProg && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 font-serif">
                {isNew ? 'Add Diploma Course' : `Edit: ${editingProg.name}`}
              </h3>
              <button
                onClick={() => setEditingProg(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Course Name *</label>
                  <input
                    type="text"
                    required
                    value={editingProg.name || ''}
                    onChange={(e) => setEditingProg({ ...editingProg, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Course Code *</label>
                  <input
                    type="text"
                    required
                    value={editingProg.code || ''}
                    onChange={(e) => setEditingProg({ ...editingProg, code: e.target.value })}
                    placeholder="e.g. D-CS / D-ME"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={editingProg.duration || '3 Years (6 Semesters)'}
                    onChange={(e) => setEditingProg({ ...editingProg, duration: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Sanctioned Intake (Seats)</label>
                  <input
                    type="number"
                    value={editingProg.intake ?? 60}
                    onChange={(e) => setEditingProg({ ...editingProg, intake: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>
              </div>

              <ImageUploader
                label="Course Thumbnail / Laboratory Image"
                currentUrl={editingProg.image}
                onImageUploaded={(url) => setEditingProg({ ...editingProg, image: url })}
                storagePath="programmes"
                required
              />

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingProg.description || ''}
                  onChange={(e) => setEditingProg({ ...editingProg, description: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Eligibility Criteria</label>
                <input
                  type="text"
                  value={editingProg.eligibility || ''}
                  onChange={(e) => setEditingProg({ ...editingProg, eligibility: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Key Highlights (1 per line)</label>
                  <textarea
                    rows={3}
                    value={highlightsInput}
                    onChange={(e) => setHighlightsInput(e.target.value)}
                    placeholder="AICTE Standard Labs&#10;Industry Internships&#10;Soft Skills Training"
                    className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Career Opportunities (comma separated)</label>
                  <textarea
                    rows={3}
                    value={careersInput}
                    onChange={(e) => setCareersInput(e.target.value)}
                    placeholder="Junior Engineer, CAD Designer, Higher Studies B.E."
                    className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Head of Department (HOD) Name</label>
                  <input
                    type="text"
                    value={editingProg.hodName || ''}
                    onChange={(e) => setEditingProg({ ...editingProg, hodName: e.target.value })}
                    placeholder="e.g. Prof. Ramesh B, M.Tech"
                    className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">HOD Welcome Message</label>
                  <input
                    type="text"
                    value={editingProg.hodMessage || ''}
                    onChange={(e) => setEditingProg({ ...editingProg, hodMessage: e.target.value })}
                    placeholder="Welcome message..."
                    className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl"
                  />
                </div>
              </div>

              <div className="flex items-center pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProg.active ?? true}
                    onChange={(e) => setEditingProg({ ...editingProg, active: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-950"
                  />
                  <span className="font-bold text-slate-800">Course is Active on Website</span>
                </label>
              </div>

              <div className="pt-6 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProg(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold uppercase tracking-wider shadow-md"
                >
                  {saving ? 'Saving...' : 'Save Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <ConfirmationModal
        isOpen={deleteTargetId !== null}
        title="Delete Course"
        message="Are you sure you want to delete this diploma course?"
        confirmText="Delete Course"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
