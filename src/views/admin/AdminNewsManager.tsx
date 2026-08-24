import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { NewsItem } from '../../types';
import { ImageUploader } from '../../components/common/ImageUploader';
import { RichTextEditor } from '../../components/common/RichTextEditor';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { Newspaper, Plus, Edit2, Trash2, Calendar, User, X } from 'lucide-react';

export const AdminNewsManager: React.FC = () => {
  const { news, addNews, updateNews, deleteNews } = useCMS();
  const [editingNews, setEditingNews] = useState<Partial<NewsItem> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleAddNew = () => {
    setIsNew(true);
    setEditingNews({
      title: 'New College Circular / Notification',
      slug: 'new-notification',
      category: 'Announcements',
      shortDescription: 'Brief summary of the official announcement.',
      fullContent: '<p>Detailed description and instructions for students and staff.</p>',
      featuredImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
      publishedDate: new Date().toISOString().split('T')[0],
      author: 'Principal Office',
      status: 'published',
      priority: 1
    });
  };

  const handleEdit = (n: NewsItem) => {
    setIsNew(false);
    setEditingNews({ ...n });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNews || !editingNews.title) {
      alert('Please provide news title.');
      return;
    }

    setSaving(true);
    try {
      const slug = (editingNews.slug || editingNews.title)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      const payload = {
        ...editingNews,
        slug
      };

      if (isNew) {
        await addNews(payload as Omit<NewsItem, 'id' | 'createdAt'>);
      } else if (editingNews.id) {
        await updateNews(editingNews.id, payload);
      }
      setEditingNews(null);
    } catch (err) {
      console.error('Error saving news:', err);
      alert('Failed to save news article.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteTargetId) {
      await deleteNews(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-sky-600" />
            <h2 className="text-xl font-bold text-slate-900 font-serif">News & Media Announcements</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Publish examination schedules, scholarship circulars, placement drives, and official bulletins.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="px-4 py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Publish New Notice</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="relative h-44 bg-slate-900 overflow-hidden">
              <img src={item.featuredImage} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <span className="absolute top-3 left-3 bg-amber-500 text-slate-950 text-[10px] font-bold uppercase px-2 py-0.5 rounded shadow">
                {item.category}
              </span>
              <span
                className={`absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  item.status === 'published' ? 'bg-emerald-500 text-white' : 'bg-slate-400 text-white'
                }`}
              >
                {item.status}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between text-xs space-y-3">
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block mb-1">
                  {item.publishedDate} • {item.author}
                </span>
                <h3 className="font-bold text-blue-950 text-base font-serif line-clamp-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-slate-500 line-clamp-2 mt-1.5">{item.shortDescription}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-lg font-bold text-xs flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setDeleteTargetId(item.id)}
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
      {editingNews && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 font-serif">
                {isNew ? 'Publish News Article / Notice' : 'Edit News Article'}
              </h3>
              <button
                onClick={() => setEditingNews(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Headline / Title *</label>
                <input
                  type="text"
                  required
                  value={editingNews.title || ''}
                  onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={editingNews.category || 'Announcements'}
                    onChange={(e) => setEditingNews({ ...editingNews, category: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl"
                  >
                    <option value="Announcements">Announcements</option>
                    <option value="Academics">Academics & Exams</option>
                    <option value="Admissions">Admissions</option>
                    <option value="Placements">Placements</option>
                    <option value="Achievements">Achievements</option>
                    <option value="Events">Events & Fests</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Publish Date</label>
                  <input
                    type="date"
                    value={editingNews.publishedDate || ''}
                    onChange={(e) => setEditingNews({ ...editingNews, publishedDate: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={editingNews.status || 'published'}
                    onChange={(e) => setEditingNews({ ...editingNews, status: e.target.value as any })}
                    className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <ImageUploader
                label="Featured Cover Image"
                currentUrl={editingNews.featuredImage}
                onImageUploaded={(url) => setEditingNews({ ...editingNews, featuredImage: url })}
                storagePath="news"
                required
              />

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Excerpt (Shows on home page cards) *</label>
                <textarea
                  rows={2}
                  required
                  value={editingNews.shortDescription || ''}
                  onChange={(e) => setEditingNews({ ...editingNews, shortDescription: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Article / Circular Content</label>
                <RichTextEditor
                  initialContent={editingNews.fullContent || ''}
                  onChange={(html) => setEditingNews({ ...editingNews, fullContent: html })}
                />
              </div>

              <div className="pt-6 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingNews(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold uppercase tracking-wider shadow-md"
                >
                  {saving ? 'Saving...' : 'Save Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <ConfirmationModal
        isOpen={deleteTargetId !== null}
        title="Delete News Article"
        message="Are you sure you want to delete this news article?"
        confirmText="Delete News"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
