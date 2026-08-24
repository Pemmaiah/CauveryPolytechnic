import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { AicteDocumentItem } from '../../types';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { ShieldCheck, Plus, Edit2, Trash2, FileText, Download, ExternalLink, X } from 'lucide-react';

export const AdminAicteManager: React.FC = () => {
  const { aicte, addAicteDoc, updateAicteDoc, deleteAicteDoc } = useCMS();
  const [editingDoc, setEditingDoc] = useState<Partial<AicteDocumentItem> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const sortedDocs = [...aicte].sort((a, b) => b.academicYear.localeCompare(a.academicYear));

  const handleAddNew = () => {
    setIsNew(true);
    setEditingDoc({
      title: 'AICTE Extension of Approval (EOA) 2026-27',
      category: 'AICTE EOA Letters',
      academicYear: '2026-27',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      fileSize: '1.4 MB',
      referenceNumber: 'F.No. South-West/1-99887766/2026/EOA',
      issueDate: '2026-05-10',
      active: true
    });
  };

  const handleEdit = (doc: AicteDocumentItem) => {
    setIsNew(false);
    setEditingDoc({ ...doc });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDoc || !editingDoc.title || !editingDoc.fileUrl) {
      alert('Please provide document title and file URL.');
      return;
    }

    setSaving(true);
    try {
      if (isNew) {
        await addAicteDoc(editingDoc as Omit<AicteDocumentItem, 'id' | 'uploadedAt'>);
      } else if (editingDoc.id) {
        await updateAicteDoc(editingDoc.id, editingDoc);
      }
      setEditingDoc(null);
    } catch (err) {
      console.error('Error saving document:', err);
      alert('Failed to save document.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteTargetId) {
      await deleteAicteDoc(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-teal-600" />
            <h2 className="text-xl font-bold text-slate-900 font-serif">AICTE & Mandatory Statutory Approvals</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Maintain AICTE Extension of Approval (EOA) records, DTE affiliation orders, and mandatory public disclosures.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="px-4 py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Upload New Approval</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4">Academic Year</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Document Title & Ref No</th>
                <th className="py-3.5 px-4">Issue Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-blue-950">{doc.academicYear}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-800 font-semibold text-[11px] border border-teal-200">
                      {doc.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{doc.title}</div>
                    {doc.referenceNumber && (
                      <div className="text-[11px] font-mono text-slate-400 mt-0.5">{doc.referenceNumber}</div>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">{doc.issueDate || '—'}</td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-slate-500 hover:text-blue-950 hover:bg-slate-100 rounded"
                        title="View Document"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => handleEdit(doc)}
                        className="p-1.5 text-blue-900 hover:bg-blue-50 rounded"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTargetId(doc.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingDoc && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 font-serif">
                {isNew ? 'Add AICTE / Statutory Approval' : 'Edit Document'}
              </h3>
              <button
                onClick={() => setEditingDoc(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Document Title *</label>
                <input
                  type="text"
                  required
                  value={editingDoc.title || ''}
                  onChange={(e) => setEditingDoc({ ...editingDoc, title: e.target.value })}
                  placeholder="e.g. AICTE Extension of Approval (EOA) 2026-27"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Academic Year *</label>
                  <input
                    type="text"
                    required
                    value={editingDoc.academicYear || '2026-27'}
                    onChange={(e) => setEditingDoc({ ...editingDoc, academicYear: e.target.value })}
                    placeholder="2026-27"
                    className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={editingDoc.category || 'AICTE EOA Letters'}
                    onChange={(e) => setEditingDoc({ ...editingDoc, category: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl"
                  >
                    <option value="AICTE EOA Letters">AICTE EOA Letters</option>
                    <option value="DTE Affiliation Orders">DTE Affiliation Orders</option>
                    <option value="Mandatory Disclosures">Mandatory Disclosures</option>
                    <option value="Governance & Committees">Governance & Committees</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">PDF Document Download URL *</label>
                <input
                  type="text"
                  required
                  value={editingDoc.fileUrl || ''}
                  onChange={(e) => setEditingDoc({ ...editingDoc, fileUrl: e.target.value })}
                  placeholder="https://.../approval.pdf"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl font-mono text-blue-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">File Size</label>
                  <input
                    type="text"
                    value={editingDoc.fileSize || '1.2 MB'}
                    onChange={(e) => setEditingDoc({ ...editingDoc, fileSize: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Official Reference Number</label>
                  <input
                    type="text"
                    value={editingDoc.referenceNumber || ''}
                    onChange={(e) => setEditingDoc({ ...editingDoc, referenceNumber: e.target.value })}
                    placeholder="e.g. F.No. SW/1-12345/2026"
                    className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl font-mono"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingDoc(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 font-bold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold uppercase tracking-wider"
                >
                  {saving ? 'Saving...' : 'Save Document'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <ConfirmationModal
        isOpen={deleteTargetId !== null}
        title="Delete Approval Document"
        message="Are you sure you want to delete this AICTE approval document?"
        confirmText="Delete Document"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
