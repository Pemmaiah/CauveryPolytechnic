import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { PageItem } from '../../types';
import { ImageUploader } from '../../components/common/ImageUploader';
import { RichTextEditor } from '../../components/common/RichTextEditor';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { 
  FileText, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  Layout, 
  Globe, 
  X, 
  Check, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const AdminPageManager: React.FC = () => {
  const { pages, addPage, updatePage, deletePage } = useCMS();
  const [editingPage, setEditingPage] = useState<Partial<PageItem> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleAddNew = () => {
    setIsNew(true);
    setEditingPage({
      title: 'New Institutional Page',
      slug: 'new-page',
      content: '<h2>Overview</h2><p>Write detailed page content here using the rich formatting tools.</p>',
      featuredImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
      layout: 'sidebar',
      status: 'published',
      metaDescription: 'Official information from Cauvery Polytechnic Gonikoppal.'
    });
  };

  const handleEdit = (p: PageItem) => {
    setIsNew(false);
    setEditingPage({ ...p });
  };

  const handleTitleChange = (title: string) => {
    if (!editingPage) return;
    const generatedSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    
    if (isNew) {
      setEditingPage({ ...editingPage, title, slug: generatedSlug });
    } else {
      setEditingPage({ ...editingPage, title });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPage || !editingPage.title || !editingPage.slug) {
      alert('Please provide title and slug.');
      return;
    }

    setSaving(true);
    try {
      if (isNew) {
        await addPage(editingPage as Omit<PageItem, 'id' | 'createdAt' | 'updatedAt'>);
      } else if (editingPage.id) {
        await updatePage(editingPage.id, editingPage);
      }
      setEditingPage(null);
    } catch (err) {
      console.error('Error saving page:', err);
      alert('Failed to save page.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteTargetId) {
      await deletePage(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-600" />
            <h2 className="text-xl font-bold text-slate-900 font-serif">Pages & Content CMS</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Create and manage institutional pages (Principal's Desk, Fee Structure, Hostel, Anti-Ragging, Placements).
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="px-4 py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Page</span>
        </button>
      </div>

      {/* Pages List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="divide-y divide-slate-100">
          {pages.map((p) => (
            <div
              key={p.id}
              className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm font-serif">{p.title}</h3>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        p.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span className="font-mono text-blue-900">/pages/{p.slug}</span>
                    <span>•</span>
                    <span className="capitalize">Layout: {p.layout}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <a
                  href={`/pages/${p.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-blue-950 hover:bg-slate-100 rounded-lg"
                  title="Preview in new window"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => handleEdit(p)}
                  className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-950 rounded-lg font-bold text-xs flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setDeleteTargetId(p.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                  title="Delete Page"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Page Edit / Create Modal */}
      {editingPage && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 font-serif">
                {isNew ? 'Create New Web Page' : `Edit Page: ${editingPage.title}`}
              </h3>
              <button
                onClick={() => setEditingPage(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Page Title *</label>
                  <input
                    type="text"
                    required
                    value={editingPage.title || ''}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Principal's Message / Hostel Facility"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Page URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingPage.slug || ''}
                    onChange={(e) => setEditingPage({ ...editingPage, slug: e.target.value })}
                    placeholder="e.g. fee-structure"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl font-mono text-blue-900"
                  />
                </div>
              </div>

              {/* Layout & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Page Layout Template</label>
                  <select
                    value={editingPage.layout || 'sidebar'}
                    onChange={(e) => setEditingPage({ ...editingPage, layout: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl font-medium"
                  >
                    <option value="sidebar">With Dynamic Sidebar (Widgets: News, Events, Downloads)</option>
                    <option value="full-width">Full Width Layout (No Sidebar)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Publication Status</label>
                  <select
                    value={editingPage.status || 'published'}
                    onChange={(e) => setEditingPage({ ...editingPage, status: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl font-medium"
                  >
                    <option value="published">Published (Live on Website)</option>
                    <option value="draft">Draft (Hidden from Public)</option>
                  </select>
                </div>
              </div>

              {/* Featured Image */}
              <ImageUploader
                label="Featured Header Banner Image (Optional)"
                currentUrl={editingPage.featuredImage}
                onImageUploaded={(url) => setEditingPage({ ...editingPage, featuredImage: url })}
                storagePath="pages"
              />

              {/* Rich Text Editor */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Page Content Body (HTML / Rich Format) *</label>
                <RichTextEditor
                  initialContent={editingPage.content || ''}
                  onChange={(html) => setEditingPage({ ...editingPage, content: html })}
                />
              </div>

              {/* Meta Description */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">SEO Meta Description</label>
                <input
                  type="text"
                  value={editingPage.metaDescription || ''}
                  onChange={(e) => setEditingPage({ ...editingPage, metaDescription: e.target.value })}
                  placeholder="Summary for search engines..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl"
                />
              </div>

              {/* Actions */}
              <div className="pt-6 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingPage(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold uppercase tracking-wider shadow-md"
                >
                  {saving ? 'Saving...' : 'Save & Publish Page'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <ConfirmationModal
        isOpen={deleteTargetId !== null}
        title="Delete Page"
        message="Are you sure you want to delete this page? Any menu links pointing to this slug may become inactive."
        confirmText="Delete Page"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
