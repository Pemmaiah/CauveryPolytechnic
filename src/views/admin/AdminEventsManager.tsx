import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { EventItem } from '../../types';
import { ImageUploader } from '../../components/common/ImageUploader';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { Calendar, Plus, Edit2, Trash2, Clock, MapPin, X } from 'lucide-react';

export const AdminEventsManager: React.FC = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useCMS();
  const [editingEvent, setEditingEvent] = useState<Partial<EventItem> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleAddNew = () => {
    setIsNew(true);
    setEditingEvent({
      title: 'State Level Technical Symposium 2026',
      date: '2026-09-15',
      time: '9:30 AM - 4:30 PM',
      venue: 'Main Auditorium, Cauvery Polytechnic Gonikoppal',
      category: 'Technical',
      description: 'Paper presentation, CAD modeling, robotics display, and coding competitions with cash prizes.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
      status: 'published',
      registrationUrl: '/contact'
    });
  };

  const handleEdit = (e: EventItem) => {
    setIsNew(false);
    setEditingEvent({ ...e });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent || !editingEvent.title || !editingEvent.date) {
      alert('Please provide event title and date.');
      return;
    }

    setSaving(true);
    try {
      if (isNew) {
        await addEvent(editingEvent as Omit<EventItem, 'id'>);
      } else if (editingEvent.id) {
        await updateEvent(editingEvent.id, editingEvent);
      }
      setEditingEvent(null);
    } catch (err) {
      console.error('Error saving event:', err);
      alert('Failed to save event.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteTargetId) {
      await deleteEvent(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-bold text-slate-900 font-serif">Campus Events & Symposia</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Publish technical festivals, cultural celebrations, athletic meets, and campus placement schedules.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="px-4 py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule New Event</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="relative h-44 bg-slate-900 overflow-hidden">
              <img src={evt.image} alt={evt.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <span className="absolute top-3 left-3 bg-purple-600 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded shadow">
                {evt.category}
              </span>
              <span className="absolute bottom-3 left-3 bg-white text-blue-950 text-xs font-bold px-2 py-0.5 rounded shadow">
                {evt.date}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between text-xs space-y-3">
              <div>
                <h3 className="font-bold text-blue-950 text-base font-serif line-clamp-2 leading-snug">
                  {evt.title}
                </h3>
                <p className="text-slate-500 line-clamp-2 mt-1.5">{evt.description}</p>
                <div className="mt-3 space-y-1 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border">
                  <p className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>{evt.time}</span>
                  </p>
                  <p className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span>{evt.venue}</span>
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleEdit(evt)}
                  className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-lg font-bold text-xs flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setDeleteTargetId(evt.id)}
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
      {editingEvent && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 font-serif">
                {isNew ? 'Schedule New Campus Event' : 'Edit Event Details'}
              </h3>
              <button
                onClick={() => setEditingEvent(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={editingEvent.title || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Event Date *</label>
                  <input
                    type="date"
                    required
                    value={editingEvent.date || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Time Schedule</label>
                  <input
                    type="text"
                    value={editingEvent.time || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })}
                    placeholder="e.g. 10:00 AM - 4:00 PM"
                    className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={editingEvent.category || 'Technical'}
                    onChange={(e) => setEditingEvent({ ...editingEvent, category: e.target.value })}
                    placeholder="Technical / Cultural / Sports / Placement"
                    className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Venue / Hall Location</label>
                <input
                  type="text"
                  value={editingEvent.venue || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, venue: e.target.value })}
                  placeholder="e.g. Main Seminar Hall / Playground"
                  className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl"
                />
              </div>

              <ImageUploader
                label="Event Poster / Banner Image"
                currentUrl={editingEvent.image}
                onImageUploaded={(url) => setEditingEvent({ ...editingEvent, image: url })}
                storagePath="events"
                required
              />

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description & Key Details</label>
                <textarea
                  rows={3}
                  value={editingEvent.description || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Registration / Info Link</label>
                  <input
                    type="text"
                    value={editingEvent.registrationUrl || '/contact'}
                    onChange={(e) => setEditingEvent({ ...editingEvent, registrationUrl: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Publication Status</label>
                  <select
                    value={editingEvent.status || 'published'}
                    onChange={(e) => setEditingEvent({ ...editingEvent, status: e.target.value as any })}
                    className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold uppercase tracking-wider shadow-md"
                >
                  {saving ? 'Saving...' : 'Save Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <ConfirmationModal
        isOpen={deleteTargetId !== null}
        title="Delete Event"
        message="Are you sure you want to delete this event?"
        confirmText="Delete Event"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
