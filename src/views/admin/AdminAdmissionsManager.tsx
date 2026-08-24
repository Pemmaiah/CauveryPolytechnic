import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { AdmissionApplication } from '../../types';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { 
  UserCheck, 
  Search, 
  Download, 
  Filter, 
  Eye, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  FileSpreadsheet,
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  GraduationCap
} from 'lucide-react';

export const AdminAdmissionsManager: React.FC = () => {
  const { admissions, updateAdmissionStatus, deleteAdmission } = useCMS();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedApp, setSelectedApp] = useState<AdmissionApplication | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const filteredAdmissions = admissions.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phone.includes(searchTerm) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id: string, newStatus: AdmissionApplication['status']) => {
    await updateAdmissionStatus(id, newStatus);
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp({ ...selectedApp, status: newStatus });
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteTargetId) {
      await deleteAdmission(deleteTargetId);
      setDeleteTargetId(null);
      if (selectedApp && selectedApp.id === deleteTargetId) {
        setSelectedApp(null);
      }
    }
  };

  const handleExportCSV = () => {
    if (admissions.length === 0) {
      alert('No applications to export.');
      return;
    }

    const headers = [
      'Application Number',
      'Applied Date',
      'Full Name',
      'Gender',
      'DOB',
      'Parent Name',
      'Phone',
      'Email',
      'Category',
      'SSLC Board',
      'SSLC Percentage',
      'Course Preference 1',
      'Course Preference 2',
      'Status'
    ];

    const rows = admissions.map((a) => [
      `"${a.applicationNumber}"`,
      `"${a.appliedAt ? new Date(a.appliedAt).toLocaleDateString() : ''}"`,
      `"${a.fullName}"`,
      `"${a.gender}"`,
      `"${a.dateOfBirth}"`,
      `"${a.parentName}"`,
      `"${a.phone}"`,
      `"${a.email}"`,
      `"${a.category}"`,
      `"${a.sslcBoard}"`,
      `"${a.sslcPercentage}%"`,
      `"${a.coursePreference1}"`,
      `"${a.coursePreference2 || ''}"`,
      `"${a.status}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Cauvery_Polytechnic_Admissions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-amber-600" />
            <h2 className="text-xl font-bold text-slate-900 font-serif">Online Admissions & Registrations</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Review candidate applications, verify SSLC scores, assign seat status, and export Excel/CSV reports.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-sm shrink-0"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Export to CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, application #, phone, email..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border rounded-xl text-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border rounded-xl text-xs font-semibold"
          >
            <option value="all">All Application Statuses</option>
            <option value="pending">Pending ({admissions.filter((a) => a.status === 'pending').length})</option>
            <option value="under_review">Under Review ({admissions.filter((a) => a.status === 'under_review').length})</option>
            <option value="approved">Approved / Selected ({admissions.filter((a) => a.status === 'approved').length})</option>
            <option value="rejected">Rejected ({admissions.filter((a) => a.status === 'rejected').length})</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4">App Number</th>
                <th className="py-3.5 px-4">Applicant Name</th>
                <th className="py-3.5 px-4">Preference 1</th>
                <th className="py-3.5 px-4">SSLC %</th>
                <th className="py-3.5 px-4">Phone / Email</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAdmissions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No admission applications found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredAdmissions.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-700">
                      {app.applicationNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{app.fullName}</div>
                      <div className="text-[11px] text-slate-400">Category: {app.category}</div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-blue-950">
                      {app.coursePreference1}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                        {app.sslcPercentage}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <div>{app.phone}</div>
                      <div className="text-[11px] text-slate-400">{app.email}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value as any)}
                        className={`text-[11px] font-bold rounded-lg px-2 py-1 border cursor-pointer ${
                          app.status === 'pending'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : app.status === 'under_review'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : app.status === 'approved'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : 'bg-rose-50 text-rose-800 border-rose-300'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="under_review">Under Review</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-950 rounded-lg font-bold text-[11px] flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Details</span>
                        </button>
                        <button
                          onClick={() => setDeleteTargetId(app.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Applicant Full Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <div>
                <span className="font-mono text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                  {selectedApp.applicationNumber}
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-serif mt-1">
                  {selectedApp.fullName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5 text-xs">
              {/* Primary Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border">
                <div>
                  <span className="text-slate-400 block font-semibold">Gender</span>
                  <span className="font-bold text-slate-800 capitalize">{selectedApp.gender}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Date of Birth</span>
                  <span className="font-bold text-slate-800">{selectedApp.dateOfBirth}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Category / Caste</span>
                  <span className="font-bold text-slate-800">{selectedApp.category}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Parent / Guardian</span>
                  <span className="font-bold text-slate-800">{selectedApp.parentName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Phone</span>
                  <span className="font-bold text-blue-900">{selectedApp.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Email</span>
                  <span className="font-bold text-blue-900 truncate block">{selectedApp.email}</span>
                </div>
              </div>

              {/* Academic Details */}
              <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/80 space-y-2">
                <h4 className="font-bold text-amber-950 text-xs font-serif uppercase tracking-wider">
                  Academic Qualifications (10th / SSLC)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-amber-800/80 block font-semibold">SSLC Board</span>
                    <span className="font-bold text-amber-950">{selectedApp.sslcBoard}</span>
                  </div>
                  <div>
                    <span className="text-amber-800/80 block font-semibold">Marks Percentage</span>
                    <span className="font-extrabold text-amber-950 text-sm">{selectedApp.sslcPercentage}%</span>
                  </div>
                  <div>
                    <span className="text-amber-800/80 block font-semibold">School Attended</span>
                    <span className="font-bold text-amber-950">{selectedApp.schoolName || '—'}</span>
                  </div>
                </div>
              </div>

              {/* Course Preferences */}
              <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-200/80 space-y-2">
                <h4 className="font-bold text-blue-950 text-xs font-serif uppercase tracking-wider">
                  Selected Course Preferences
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-blue-800/80 block font-semibold">1st Course Choice</span>
                    <span className="font-bold text-blue-950">{selectedApp.coursePreference1}</span>
                  </div>
                  <div>
                    <span className="text-blue-800/80 block font-semibold">2nd Course Choice</span>
                    <span className="font-bold text-blue-950">{selectedApp.coursePreference2 || 'None'}</span>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <span className="text-slate-500 font-bold block mb-1">Residential Address</span>
                <p className="p-3 bg-slate-50 rounded-xl border text-slate-800">{selectedApp.address}</p>
              </div>

              {/* Status Selector */}
              <div className="pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-700">Change Application Status:</span>
                  <select
                    value={selectedApp.status}
                    onChange={(e) => handleStatusChange(selectedApp.id, e.target.value as any)}
                    className="px-3 py-1.5 bg-slate-100 border rounded-xl font-bold text-xs"
                  >
                    <option value="pending">Pending</option>
                    <option value="under_review">Under Review</option>
                    <option value="approved">Approved / Selected</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="px-5 py-2 bg-blue-950 text-white font-bold rounded-xl"
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
        title="Delete Application Record"
        message="Are you sure you want to delete this applicant's record?"
        confirmText="Delete Application"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
