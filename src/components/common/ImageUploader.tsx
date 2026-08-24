import React, { useState, useRef } from 'react';
import { Upload, X, Check, Image as ImageIcon, Link as LinkIcon, FileText } from 'lucide-react';
import { uploadFileToStorage } from '../../lib/firestoreService';

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  folder?: string;
  accept?: string;
  isDocument?: boolean;
  helperText?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label = 'Upload Image',
  folder = 'images',
  accept = 'image/jpeg,image/png,image/webp,image/jpg',
  isDocument = false,
  helperText = 'Supports JPG, PNG, WEBP up to 5MB'
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isManualUrl, setIsManualUrl] = useState(false);
  const [manualInput, setManualInput] = useState(value || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file) return;
    try {
      setIsUploading(true);
      setProgress(10);
      const url = await uploadFileToStorage(file, folder, (p) => setProgress(p));
      onChange(url);
      setManualInput(url);
    } catch (err) {
      console.error('Upload failed:', err);
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
    if (manualInput.trim()) {
      onChange(manualInput.trim());
    }
  };

  const handleRemove = () => {
    onChange('');
    setManualInput('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setIsManualUrl(!isManualUrl)}
          className="text-xs text-blue-800 hover:text-blue-950 font-medium flex items-center gap-1"
        >
          {isManualUrl ? <Upload className="w-3 h-3" /> : <LinkIcon className="w-3 h-3" />}
          {isManualUrl ? 'Switch to Upload' : 'Direct URL'}
        </button>
      </div>

      {isManualUrl ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            placeholder={isDocument ? 'https://example.com/document.pdf' : 'https://images.unsplash.com/...'}
            className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
          />
          <button
            type="button"
            onClick={handleManualApply}
            className="px-3 py-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold rounded-lg shadow-sm"
          >
            Apply
          </button>
        </div>
      ) : value ? (
        /* Preview state */
        <div className="relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50 group">
          {isDocument ? (
            <div className="p-4 flex items-center gap-3">
              <div className="p-3 bg-red-100 text-red-700 rounded-lg">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">Document Attached</p>
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-700 hover:underline truncate block"
                >
                  {value}
                </a>
              </div>
            </div>
          ) : (
            <div className="relative h-44 w-full bg-slate-900/5 flex items-center justify-center overflow-hidden">
              <img
                src={value}
                alt="Preview"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 bg-white/90 hover:bg-white text-slate-900 text-xs font-bold rounded-lg shadow-md transition-transform active:scale-95"
                >
                  Replace
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow-md transition-transform active:scale-95"
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full shadow transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        /* Drag & drop upload area */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
            isDragOver
              ? 'border-blue-700 bg-blue-50/50'
              : 'border-slate-300 hover:border-slate-400 bg-slate-50/50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }}
            className="hidden"
          />

          {isUploading ? (
            <div className="space-y-3">
              <div className="w-8 h-8 border-3 border-blue-900/30 border-t-blue-900 rounded-full animate-spin mx-auto" />
              <p className="text-xs font-semibold text-slate-700">Uploading... {progress}%</p>
              <div className="w-48 mx-auto bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div className="bg-blue-900 h-full transition-all duration-200" style={{ width: `${progress}%` }} />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-900 flex items-center justify-center mx-auto">
                {isDocument ? <FileText className="w-5 h-5" /> : <Upload className="w-5 h-5" />}
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800">
                  <span className="text-blue-900">Click to upload</span> or drag and drop
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">{helperText}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
