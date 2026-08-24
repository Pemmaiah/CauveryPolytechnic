import React, { useState, useMemo } from 'react';
import { useCMS } from '../../context/CMSContext';
import { AicteItem } from '../../types';
import { PdfViewerModal } from '../../components/common/PdfViewerModal';
import { 
  ShieldCheck, 
  Download, 
  FileText, 
  Search, 
  ExternalLink, 
  Filter, 
  Eye, 
  Calendar,
  Building,
  CheckCircle,
  FileCheck
} from 'lucide-react';

export const AicteView: React.FC = () => {
  const { aicte, settings } = useCMS();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedYear, setSelectedYear] = useState('ALL');
  const [activePreviewDoc, setActivePreviewDoc] = useState<AicteItem | null>(null);

  const activeDocs = aicte
    .filter((a) => a.active !== false)
    .sort((a, b) => (b.academicYear || '').localeCompare(a.academicYear || '') || (a.displayOrder || 0) - (b.displayOrder || 0));

  const categories = useMemo(() => {
    const cats = Array.from(new Set(activeDocs.map((d) => d.category).filter(Boolean)));
    return ['ALL', ...cats];
  }, [activeDocs]);

  const academicYears = useMemo(() => {
    const years = Array.from(new Set(activeDocs.map((d) => d.academicYear).filter(Boolean)));
    return ['ALL', ...years];
  }, [activeDocs]);

  const filteredDocs = useMemo(() => {
    return activeDocs.filter((doc) => {
      const matchCat = selectedCategory === 'ALL' || doc.category === selectedCategory;
      const matchYear = selectedYear === 'ALL' || doc.academicYear === selectedYear;
      const matchSearch =
        (doc.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doc.academicYear || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doc.referenceNumber && doc.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (doc.fileName && doc.fileName.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchCat && matchYear && matchSearch;
    });
  }, [activeDocs, selectedCategory, selectedYear, searchTerm]);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Institutional Statutory Banner */}
      <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-blue-950 text-white py-14 px-4 sm:px-6 lg:px-8 shadow-lg border-b border-blue-900">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3.5 border border-amber-400/30">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>AICTE New Delhi Approved • DTE Karnataka Code: {settings.dsaCode || '494'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight text-white">
            AICTE & Statutory Mandatory Approvals
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Official All India Council for Technical Education (AICTE) Extension of Approval (EOA) letters, Directorate of Technical Education (DTE) Karnataka affiliation records, and mandatory public compliance disclosures for Cauvery Polytechnic, Gonikoppal.
          </p>

          {/* Quick Institutional Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-800/80">
            <div className="bg-white/5 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
              <p className="text-xs text-amber-400 font-bold uppercase tracking-wider">AICTE Permanent ID</p>
              <p className="text-sm sm:text-base font-bold text-white font-mono mt-0.5">{settings.aicteCode || '1-456789123'}</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
              <p className="text-xs text-amber-400 font-bold uppercase tracking-wider">DTE Institute Code</p>
              <p className="text-sm sm:text-base font-bold text-white font-mono mt-0.5">{settings.dsaCode || '494'}</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
              <p className="text-xs text-amber-400 font-bold uppercase tracking-wider">Approval Status</p>
              <p className="text-sm sm:text-base font-bold text-emerald-400 mt-0.5 flex items-center gap-1">
                <CheckCircle className="w-4 h-4 inline" /> Active & Extended
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
              <p className="text-xs text-amber-400 font-bold uppercase tracking-wider">Total Documents</p>
              <p className="text-sm sm:text-base font-bold text-white font-mono mt-0.5">{activeDocs.length} Approvals</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Search & Category Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-blue-950 text-amber-400 shadow-md ring-2 ring-amber-400/30'
                      : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {cat === 'ALL' ? 'All Categories' : cat}
                </button>
              ))}
            </div>

            {/* Search Input & Year Selector */}
            <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:ring-2 focus:ring-blue-900/20"
              >
                <option value="ALL">All Academic Years</option>
                {academicYears.filter((y) => y !== 'ALL').map((year) => (
                  <option key={year} value={year}>
                    AY {year}
                  </option>
                ))}
              </select>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search approvals or ref no..."
                  className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Documents Grid */}
        {filteredDocs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocs.map((doc) => {
              const targetDocUrl = doc.pdfData || doc.documentUrl || doc.fileUrl || '';
              return (
                <div
                  key={doc.id}
                  className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-blue-300"
                >
                  <div className="p-6">
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      <span className="px-2.5 py-1 bg-blue-50 text-blue-900 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-blue-200">
                        {doc.category || 'AICTE EOA'}
                      </span>
                      <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-200">
                        AY {doc.academicYear}
                      </span>
                    </div>

                    {/* Document Title */}
                    <h3 className="text-base font-bold text-slate-900 font-serif leading-snug group-hover:text-blue-900 transition-colors">
                      {doc.title}
                    </h3>

                    {/* Reference Number */}
                    {doc.referenceNumber && (
                      <p className="mt-2 text-xs text-slate-500 font-mono bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <span className="text-slate-400">Ref: </span>
                        {doc.referenceNumber}
                      </p>
                    )}

                    {/* Description or File Metadata */}
                    {doc.description && (
                      <p className="mt-2.5 text-xs text-slate-600 line-clamp-2">
                        {doc.description}
                      </p>
                    )}

                    <div className="mt-4 flex items-center gap-3 text-[11px] text-slate-400 font-medium">
                      <span className="flex items-center gap-1 text-red-700 font-semibold">
                        <FileText className="w-3.5 h-3.5" />
                        <span>{doc.fileName || 'Statutory PDF'}</span>
                      </span>
                      {doc.fileSize && (
                        <span>• {doc.fileSize}</span>
                      )}
                      {(doc.issueDate || doc.date) && (
                        <span>• {doc.issueDate || doc.date}</span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons Footer */}
                  <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setActivePreviewDoc(doc)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-blue-50 text-blue-900 border border-slate-200 hover:border-blue-300 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-500" />
                      <span>Preview</span>
                    </button>

                    {targetDocUrl ? (
                      <a
                        href={targetDocUrl}
                        download={doc.fileName || `${doc.title.replace(/\s+/g, '_')}.pdf`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-950 hover:bg-blue-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5 text-amber-400" />
                        <span>Download</span>
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400 italic">No File</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-serif">No Approvals Matching Filter</h3>
              <p className="text-xs text-slate-500 mt-1">
                No statutory documents found for your search query or category filter. Try clearing the filter.
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('ALL');
                setSelectedYear('ALL');
                setSearchTerm('');
              }}
              className="px-4 py-2 bg-blue-950 text-white text-xs font-bold rounded-xl uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* PDF Viewer Modal */}
      {activePreviewDoc && (
        <PdfViewerModal
          isOpen={activePreviewDoc !== null}
          onClose={() => setActivePreviewDoc(null)}
          title={activePreviewDoc.title}
          pdfUrl={activePreviewDoc.fileUrl || activePreviewDoc.documentUrl}
          pdfData={activePreviewDoc.pdfData}
          fileName={activePreviewDoc.fileName}
          referenceNumber={activePreviewDoc.referenceNumber}
          category={activePreviewDoc.category}
          academicYear={activePreviewDoc.academicYear}
        />
      )}
    </div>
  );
};
