import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { AicteDocumentItem } from '../../types';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { PdfUploader } from '../../components/common/PdfUploader';
import { PdfViewerModal } from '../../components/common/PdfViewerModal';
import { 
  ShieldCheck, 
  Plus, 
  Edit2, 
  Trash2, 
  FileText, 
  Download, 
  ExternalLink, 
  X, 
  Eye, 
  Calendar, 
  Building,
  CheckCircle2
} from 'lucide-react';

export const AdminAicteManager: React.FC = () => {
  const { aicte, addAicteDoc, updateAicteDoc, deleteAicteDoc } = useCMS();
  const [editingDoc, setEditingDoc] = useState<Partial<AicteDocumentItem> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<AicteDocumentItem | null>(null);

  const sortedDocs = [...aicte].sort((a, b) => (b.academicYear || '').localeCompare(a.academicYear || ''));

  const handleAddNew = () => {
    setIsNew(true);
    setEditingDoc({
      title: 'AICTE Extension of Approval (EOA) 2026-27',
      category: 'AICTE EOA Letters',
      academicYear: '2026-27',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      documentUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      fileName: 'AICTE_Extension_of_Approval_2026_27.pdf',
      fileSize: '1.4 MB',
      referenceNumber: 'F.No. South-West/1-99887766/2026/EOA',
      issueDate: new Date().toISOString().split('T')[0],
      active: true,
      displayOrder: aicte.length + 1
    });
  };

  const handleEdit = (doc: AicteDocumentItem) => {
    setIsNew(false);
    setEditingDoc({ ...doc });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDoc || !editingDoc.title) {
      alert('Please provide document title.');
      return;
    }

    if (!editingDoc.fileUrl && !editingDoc.documentUrl && !editingDoc.pdfData) {
      alert('Please upload or attach a PDF document.');
      return;
    }

    setSaving(true);
    try {
      const payload: Partial<AicteDocumentItem> = {
        ...editingDoc,
        documentUrl: editingDoc.pdfData || editingDoc.fileUrl || editingDoc.documentUrl,
        fileUrl: editingDoc.pdfData || editingDoc.fileUrl || editingDoc.documentUrl,
        uploadDate: editingDoc.uploadDate || new Date().toISOString().split('T')[0]
      };

      if (isNew) {
        await addAicteDoc(payload as Omit<AicteDocumentItem, 'id' | 'uploadedAt'>);
      } else if (editingDoc.id) {
        await updateAicteDoc(editingDoc.id, payload);
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
            Maintain AICTE Extension of Approval (EOA) records, DTE affiliation orders, and mandatory public disclosures. Upload & store statutory PDFs directly in the database.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="px-4 py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Upload New Approval PDF</span>
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900 font-serif">{aicte.length}</p>
            <p className="text-[11px] font-semibold text-slate-500 uppercase">Statutory Documents</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900 font-serif">
              {new Set(aicte.map((d) => d.academicYear).filter(Boolean)).size}
            </p>
            <p className="text-[11px] font-semibold text-slate-500 uppercase">Academic Years Covered</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900 font-serif">
              {aicte.filter((d) => d.active).length}
            </p>
            <p className="text-[11px] font-semibold text-slate-500 uppercase">Publicly Active</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4">Academic Year</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Document Title & File</th>
                <th className="py-3.5 px-4">Issue Date</th>
                <th className="py-3.5 px-4">Storage Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedDocs.map((doc) => {
                const targetPdf = doc.pdfData || doc.documentUrl || doc.fileUrl || '';
                return (
                  <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-blue-950">
                      <span className="bg-blue-50 text-blue-900 px-2 py-0.5 rounded font-mono font-bold border border-blue-200">
                        {doc.academicYear}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-800 font-semibold text-[11px] border border-teal-200">
                        {doc.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{doc.title}</div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5 flex-wrap">
                        {doc.referenceNumber && (
                          <span className="font-mono text-slate-400">Ref: {doc.referenceNumber}</span>
                        )}
                        {doc.fileName && (
                          <span className="text-red-700 font-medium flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            <span>{doc.fileName}</span>
                          </span>
                        )}
                        {doc.fileSize && (
                          <span className="text-slate-400">({doc.fileSize})</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {doc.issueDate || doc.date || '—'}
                    </td>
                    <td className="py-3.5 px-4">
                      {doc.pdfData ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold text-[10px] border border-emerald-200">
                          DB Stored (Base64)
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[10px] border border-slate-200">
                          Cloud URL
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {targetPdf && (
                          <button
                            onClick={() => setPreviewDoc(doc)}
                            className="p-1.5 text-blue-900 hover:bg-blue-50 rounded"
                            title="Preview PDF Document"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                        {targetPdf && (
                          <a
                            href={targetPdf}
                            download={doc.fileName || 'approval_doc.pdf'}
                            className="p-1.5 text-slate-500 hover:text-blue-950 hover:bg-slate-100 rounded"
                            title="Download Document"
                          >
                            <Download className="w-4 h-4" />
                          </a>
                        )}
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingDoc && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-serif">
                  {isNew ? 'Upload & Add AICTE / Statutory Approval' : 'Edit Statutory Approval Document'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Uploaded PDF files will be safely stored and made downloadable on the public portal.
                </p>
              </div>
              <button
                onClick={() => setEditingDoc(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5 text-xs">
              {/* Document Title */}
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

              {/* Academic Year & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <label className="block font-bold text-slate-700 mb-1">Approval Category</label>
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

              {/* PDF Document Upload Section */}
              <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200">
                <PdfUploader
                  pdfUrl={editingDoc.fileUrl || editingDoc.documentUrl}
                  pdfData={editingDoc.pdfData}
                  fileName={editingDoc.fileName}
                  fileSize={editingDoc.fileSize}
                  onChange={(data) => {
                    setEditingDoc({
                      ...editingDoc,
                      pdfData: data.pdfData,
                      fileUrl: data.pdfUrl || data.pdfData,
                      documentUrl: data.pdfUrl || data.pdfData,
                      fileName: data.fileName,
                      fileSize: data.fileSize
                    });
                  }}
                  onPreview={() => {
                    setPreviewDoc(editingDoc as AicteDocumentItem);
                  }}
                />
              </div>

              {/* Reference number and Issue date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Official Reference Number</label>
                  <input
                    type="text"
                    value={editingDoc.referenceNumber || ''}
                    onChange={(e) => setEditingDoc({ ...editingDoc, referenceNumber: e.target.value })}
                    placeholder="e.g. F.No. South-West/1-99887766/2026/EOA"
                    className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Approval Issue Date</label>
                  <input
                    type="date"
                    value={editingDoc.issueDate || ''}
                    onChange={(e) => setEditingDoc({ ...editingDoc, issueDate: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl"
                  />
                </div>
              </div>

              {/* Public Visibility */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="activeDocCheck"
                  checked={editingDoc.active ?? true}
                  onChange={(e) => setEditingDoc({ ...editingDoc, active: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-900 focus:ring-blue-900 border-slate-300"
                />
                <label htmlFor="activeDocCheck" className="text-slate-700 font-bold cursor-pointer">
                  Display publicly in AICTE Approvals section
                </label>
              </div>

              {/* Modal Buttons */}
              <div className="pt-5 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingDoc(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold uppercase tracking-wider transition-all disabled:opacity-50"
                >
                  {saving ? 'Saving Document...' : 'Save & Publish to DB'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PDF Viewer Modal */}
      {previewDoc && (
        <PdfViewerModal
          isOpen={previewDoc !== null}
          onClose={() => setPreviewDoc(null)}
          title={previewDoc.title}
          pdfUrl={previewDoc.fileUrl || previewDoc.documentUrl}
          pdfData={previewDoc.pdfData}
          fileName={previewDoc.fileName}
          referenceNumber={previewDoc.referenceNumber}
          category={previewDoc.category}
          academicYear={previewDoc.academicYear}
        />
      )}

      {/* Delete Modal */}
      <ConfirmationModal
        isOpen={deleteTargetId !== null}
        title="Delete Approval Document"
        message="Are you sure you want to delete this AICTE approval document? This action cannot be undone."
        confirmText="Delete Document"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
