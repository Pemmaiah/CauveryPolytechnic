import React, { useState, useMemo } from 'react';
import { useCMS } from '../../context/CMSContext';
import { ShieldCheck, Download, FileText, Search, ExternalLink, Filter } from 'lucide-react';

export const AicteView: React.FC = () => {
  const { aicte, settings } = useCMS();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const activeDocs = aicte.filter((a) => a.active).sort((a, b) => a.displayOrder - b.displayOrder);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(activeDocs.map((d) => d.category).filter(Boolean)));
    return ['ALL', ...cats];
  }, [activeDocs]);

  const filteredDocs = useMemo(() => {
    return activeDocs.filter((doc) => {
      const matchCat = selectedCategory === 'ALL' || doc.category === selectedCategory;
      const matchSearch =
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.academicYear.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doc.referenceNumber && doc.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [activeDocs, selectedCategory, searchTerm]);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      {/* Banner */}
      <div className="bg-blue-950 text-white py-14 px-4 sm:px-6 lg:px-8 mb-12 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3 border border-amber-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Statutory Approvals & Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight text-white">
            AICTE Approvals & Mandatory Disclosures
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Official All India Council for Technical Education (AICTE) Extension of Approval (EOA) letters, DTE Karnataka affiliation records, and institutional disclosures for Cauvery Polytechnic (DTE Code: {settings.dsaCode || '494'}).
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-blue-950 text-amber-400 shadow-md'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat === 'ALL' ? 'All Documents' : cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search approvals by year or ref..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
            />
          </div>
        </div>

        {/* Documents Grid / Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 bg-blue-100 text-blue-900 text-[10px] font-bold uppercase tracking-wider rounded-md">
                    {doc.category}
                  </span>
                  <span className="font-mono text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    AY {doc.academicYear}
                  </span>
                </div>

                <h3 className="text-base font-bold text-blue-950 font-serif leading-snug">
                  {doc.title}
                </h3>

                {doc.referenceNumber && (
                  <p className="mt-2 text-xs text-slate-500 font-mono">
                    Ref: {doc.referenceNumber}
                  </p>
                )}

                <p className="mt-2 text-xs text-slate-400">
                  Uploaded on {doc.uploadDate}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">
                  PDF Document
                </span>
                <a
                  href={doc.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-950 hover:bg-blue-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
