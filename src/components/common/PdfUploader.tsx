import React, { useState, useRef } from 'react';
import { Upload, FileText, Check, X, Link as LinkIcon, Eye, Download, AlertCircle } from 'lucide-react';
import { uploadFileToStorage } from '../../lib/firestoreService';

interface PdfUploaderProps {
  pdfUrl?: string;
  pdfData?: string;
  fileName?: string;
  fileSize?: string;
  onChange: (data: { pdfUrl?: string; pdfData?: string; fileName?: string; fileSize?: string }) => void;
  label?: string;
  helperText?: string;
  onPreview?: () => void;
}

export const PdfUploader: React.FC<PdfUploaderProps> = ({
  pdfUrl = '',
  pdfData = '',
  fileName = '',
  fileSize = '',
  onChange,
  label = 'Upload Official Statutory PDF Document',
  helperText = 'Upload official signed AICTE EOA, DTE Orders, or Mandatory Disclosures in PDF format (Up to 25MB).',
  onPreview
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isManualUrl, setIsManualUrl] = useState(false);
  const [manualInput, setManualInput] = useState(pdfUrl || '');
  const [manualFileName, setManualFileName] = useState(fileName || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatBytes = (bytes: number, decimals = 1) => {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  const handleFile = async (file: File) => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      alert('Please select a valid PDF document (.pdf).');
      return;
    }

    try {
      setIsUploading(true);
      setProgress(15);

      const calculatedSize = formatBytes(file.size);
      const name = file.name;

      // 1. Read as Data URL (Stored in database for 100% offline & instant persistence)
      const reader = new FileReader();
      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          const p = Math.round((e.loaded / e.total) * 60);
          setProgress(15 + p);
        }
      };

      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      // 2. Also try uploading to Storage
      let uploadedStorageUrl = '';
      try {
        uploadedStorageUrl = await uploadFileToStorage(file, 'aicte_docs', (pct) => {
          setProgress(75 + Math.round(pct * 0.25));
        });
      } catch (err) {
        console.warn('Storage upload fallback:', err);
      }

      const base64Data = await base64Promise;
      setProgress(100);

      onChange({
        pdfData: base64Data,
        pdfUrl: uploadedStorageUrl || base64Data,
        fileName: name,
        fileSize: calculatedSize
      });
    } catch (err) {
      console.error('Failed to process PDF:', err);
      alert('Failed to process PDF document. Please try again.');
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleManualApply = () => {
    if (!manualInput.trim()) return;
    const url = manualInput.trim();
    const inferredName = manualFileName.trim() || url.split('/').pop()?.split('?')[0] || 'approval_document.pdf';
    onChange({
      pdfUrl: url,
      pdfData: url.startsWith('data:') ? url : '',
      fileName: inferredName,
      fileSize: fileSize || '1.5 MB'
    });
  };

  const handleRemove = () => {
    onChange({
      pdfUrl: '',
      pdfData: '',
      fileName: '',
      fileSize: ''
    });
    setManualInput('');
    setManualFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const hasDocument = Boolean(pdfData || pdfUrl);

  return (
    <div className="space-y-3">
      {/* Header with Switcher */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
          <FileText className="w-4 h-4 text-red-600" />
          <span>{label}</span>
        </label>
        <button
          type="button"
          onClick={() => setIsManualUrl(!isManualUrl)}
          className="text-xs text-blue-900 hover:text-blue-950 font-semibold flex items-center gap-1 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200"
        >
          {isManualUrl ? <Upload className="w-3 h-3" /> : <LinkIcon className="w-3 h-3" />}
          <span>{isManualUrl ? 'Switch to File Upload' : 'Direct URL / Cloud Link'}</span>
        </button>
      </div>

      {isManualUrl ? (
        /* Manual URL mode */
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700">PDF Document Direct URL</label>
            <input
              type="text"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              placeholder="https://aicte-india.org/eoa-2026-27.pdf or https://..."
              className="w-full px-3.5 py-2 text-xs font-mono bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700">Document File Name</label>
              <input
                type="text"
                value={manualFileName}
                onChange={(e) => setManualFileName(e.target.value)}
                placeholder="AICTE_Approval_Order_2026.pdf"
                className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-xl"
              />
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleManualApply}
                className="w-full py-2 bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm"
              >
                Apply URL to Record
              </button>
            </div>
          </div>
        </div>
      ) : hasDocument ? (
        /* Attached PDF Card */
        <div className="p-4 rounded-2xl bg-gradient-to-r from-red-50/70 via-white to-slate-50 border-2 border-red-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center font-bold text-xs uppercase shrink-0 shadow-sm">
              <FileText className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {fileName || 'AICTE_Approval_Document.pdf'}
                </p>
                <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Stored in DB
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {fileSize || 'PDF Document'} • Ready for Public Download & Statutory Audit
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onPreview && (
              <button
                type="button"
                onClick={onPreview}
                className="px-3 py-1.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>Preview PDF</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors"
              title="Remove PDF"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Drag & Drop Upload Zone */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-7 text-center cursor-pointer transition-all duration-200 ${
            isDragOver
              ? 'border-red-600 bg-red-50/70 scale-[1.01]'
              : 'border-slate-300 hover:border-red-500 bg-slate-50/60 hover:bg-red-50/30'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf,.pdf"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }}
            className="hidden"
          />

          {isUploading ? (
            <div className="space-y-3 py-2">
              <div className="w-10 h-10 border-3 border-red-200 border-t-red-600 rounded-full animate-spin mx-auto" />
              <div>
                <p className="text-xs font-bold text-slate-800">Processing & Storing PDF Document...</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{progress}% completed</p>
              </div>
              <div className="w-56 mx-auto bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div className="bg-red-600 h-full transition-all duration-200" style={{ width: `${progress}%` }} />
              </div>
            </div>
          ) : (
            <div className="space-y-2.5">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto shadow-xs">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">
                  <span className="text-red-600 underline decoration-red-400">Click to upload PDF</span> or drag & drop file here
                </p>
                <p className="text-[11px] text-slate-500 mt-1 max-w-md mx-auto">
                  {helperText}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quick Official Template Presets */}
      <div className="pt-2">
        <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider block mb-1.5">
          Or Select Standard AICTE / DTE Document Templates:
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              onChange({
                pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
                pdfData: '',
                fileName: 'AICTE_Extension_of_Approval_2026_27.pdf',
                fileSize: '1.4 MB'
              });
            }}
            className="text-[11px] bg-slate-100 hover:bg-blue-50 hover:text-blue-900 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors flex items-center gap-1"
          >
            <FileText className="w-3 h-3 text-red-500" />
            <span>AICTE EOA 2026-27 Template</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onChange({
                pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
                pdfData: '',
                fileName: 'DTE_Karnataka_Affiliation_Order_2026.pdf',
                fileSize: '980 KB'
              });
            }}
            className="text-[11px] bg-slate-100 hover:bg-blue-50 hover:text-blue-900 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors flex items-center gap-1"
          >
            <FileText className="w-3 h-3 text-red-500" />
            <span>DTE Affiliation Order Template</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onChange({
                pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
                pdfData: '',
                fileName: 'Mandatory_Public_Disclosures_2026.pdf',
                fileSize: '2.1 MB'
              });
            }}
            className="text-[11px] bg-slate-100 hover:bg-blue-50 hover:text-blue-900 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors flex items-center gap-1"
          >
            <FileText className="w-3 h-3 text-red-500" />
            <span>Mandatory Public Disclosure</span>
          </button>
        </div>
      </div>
    </div>
  );
};
