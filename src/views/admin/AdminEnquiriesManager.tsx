import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { ContactEnquiry } from '../../types';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { 
  MessageSquare, 
  Search, 
  Trash2, 
  Eye, 
  Mail, 
  Phone, 
  CheckCircle, 
  Clock, 
  X,
  Send
} from 'lucide-react';

export const AdminEnquiriesManager: React.FC = () => {
  const { enquiries, updateEnquiryStatus, deleteEnquiry } = useCMS();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<ContactEnquiry | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const filteredEnquiries = enquiries.filter((e) =>
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.phone.includes(searchTerm) ||
    e.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenEnquiry = async (enquiry: ContactEnquiry) => {
    setSelectedEnquiry(enquiry);
    if (enquiry.status === 'unread') {
      await updateEnquiryStatus(enquiry.id, 'read');
    }
  };

  const handleMarkResponded = async (id: string) => {
    await updateEnquiryStatus(id, 'responded');
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status: 'responded' });
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteTargetId) {
      await deleteEnquiry(deleteTargetId);
      setDeleteTargetId(null);
      if (selectedEnquiry && selectedEnquiry.id === deleteTargetId) {
        setSelectedEnquiry(null);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-blue-900" />
            <h2 className="text-xl font-bold text-slate-900 font-serif">Contact Inquiries & Feedback</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Read and manage incoming public queries from students, parents, and industry partners.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search inquiries by sender name, subject, phone, email..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border rounded-xl text-xs"
          />
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="divide-y divide-slate-100">
          {filteredEnquiries.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">No inquiries found.</div>
          ) : (
            filteredEnquiries.map((enq) => (
              <div
                key={enq.id}
                onClick={() => handleOpenEnquiry(enq)}
                className={`p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer transition-colors ${
                  enq.status === 'unread' ? 'bg-amber-50/40 hover:bg-amber-50/80 font-bold' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${
                      enq.status === 'unread'
                        ? 'bg-amber-500 ring-4 ring-amber-100'
                        : enq.status === 'responded'
                        ? 'bg-emerald-500'
                        : 'bg-slate-300'
                    }`}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-slate-900">{enq.name}</span>
                      <span className="text-[11px] text-slate-400 font-normal">
                        ({enq.phone} • {enq.email})
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-blue-950 mt-1">{enq.subject}</h4>
                    <p className="text-xs text-slate-500 font-normal line-clamp-1 mt-0.5">{enq.message}</p>
                    <span className="text-[10px] text-slate-400 font-normal block mt-1">
                      Received: {enq.createdAt ? new Date(enq.createdAt).toLocaleString() : 'Recent'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                      enq.status === 'unread'
                        ? 'bg-amber-100 text-amber-900'
                        : enq.status === 'responded'
                        ? 'bg-emerald-100 text-emerald-900'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {enq.status}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteTargetId(enq.id);
                    }}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 font-serif">Inquiry Details</h3>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-2xl border space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{selectedEnquiry.name}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      selectedEnquiry.status === 'unread'
                        ? 'bg-amber-100 text-amber-800'
                        : selectedEnquiry.status === 'responded'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {selectedEnquiry.status}
                  </span>
                </div>
                <div className="text-slate-600 space-y-1">
                  <p className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-blue-900" />
                    <span>{selectedEnquiry.phone}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-900" />
                    <span>{selectedEnquiry.email}</span>
                  </p>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-700 block mb-1">Subject</span>
                <p className="font-semibold text-slate-900">{selectedEnquiry.subject}</p>
              </div>

              <div>
                <span className="font-bold text-slate-700 block mb-1">Message Body</span>
                <p className="p-3.5 bg-slate-50 rounded-xl border text-slate-800 leading-relaxed whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </p>
              </div>

              <div className="pt-4 border-t flex items-center justify-between gap-3">
                {selectedEnquiry.status !== 'responded' ? (
                  <button
                    onClick={() => handleMarkResponded(selectedEnquiry.id)}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl flex items-center gap-1.5"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Mark as Responded</span>
                  </button>
                ) : (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> Responded
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedEnquiry(null)}
                  className="px-4 py-2 bg-slate-200 text-slate-800 font-bold rounded-xl"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmationModal
        isOpen={deleteTargetId !== null}
        title="Delete Inquiry"
        message="Are you sure you want to delete this contact message?"
        confirmText="Delete Message"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
