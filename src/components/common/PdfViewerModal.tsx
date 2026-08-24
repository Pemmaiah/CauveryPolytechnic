import React, { useState } from 'react';
import { X, Download, ExternalLink, FileText, ZoomIn, ZoomOut, RotateCw, Maximize2 } from 'lucide-react';

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  pdfUrl?: string;
  pdfData?: string;
  fileName?: string;
  referenceNumber?: string;
  category?: string;
  academicYear?: string;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  isOpen,
  onClose,
  title,
  pdfUrl,
  pdfData,
  fileName = 'document.pdf',
  referenceNumber,
  category,
  academicYear
}) => {
  const [zoom, setZoom] = useState(100);

  if (!isOpen) return null;

  const targetSource = pdfData || pdfUrl || '';

  const handleDownload = () => {
    if (!targetSource) return;
    const link = document.createElement('a');
    link.href = targetSource;
    link.download = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenNewTab = () => {
    if (!targetSource) return;
    window.open(targetSource, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-5xl h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Top Header Bar */}
        <div className="px-5 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-md">
                  {title}
                </h3>
                {academicYear && (
                  <span className="px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 text-[10px] font-mono font-bold border border-blue-700">
                    AY {academicYear}
                  </span>
                )}
                {category && (
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-bold border border-slate-700 hidden sm:inline">
                    {category}
                  </span>
                )}
              </div>
              {referenceNumber && (
                <p className="text-xs text-slate-400 font-mono truncate mt-0.5">
                  Ref: {referenceNumber}
                </p>
              )}
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleOpenNewTab}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors"
              title="Open in new window"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm transition-all"
              title="Download PDF"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-red-950/80 hover:text-red-300 text-slate-400 transition-colors"
              title="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Viewer Body */}
        <div className="flex-1 bg-slate-950 p-2 sm:p-4 overflow-hidden relative flex flex-col items-center justify-center">
          {targetSource ? (
            <div className="w-full h-full rounded-2xl overflow-hidden bg-white shadow-inner flex flex-col">
              <iframe
                src={`${targetSource}#toolbar=1&navpanes=0&scrollbar=1`}
                title={title}
                className="w-full h-full border-0 bg-white"
              />
            </div>
          ) : (
            <div className="text-center p-8 space-y-4 max-w-md">
              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 mx-auto">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-200">No PDF Document Attached</h4>
                <p className="text-xs text-slate-400 mt-1">
                  This statutory item does not have a PDF document attached yet.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="px-5 py-2.5 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Official Institution AICTE Statutory Record</span>
          </div>
          <div>
            <span>Cauvery Polytechnic (DTE Code: 494)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
