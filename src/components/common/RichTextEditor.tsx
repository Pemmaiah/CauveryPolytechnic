import React, { useState, useRef, useEffect } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify, 
  List, 
  ListOrdered, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Table as TableIcon, 
  Quote, 
  Undo, 
  Redo, 
  Code, 
  Eye, 
  Heading1, 
  Heading2, 
  Heading3,
  Type
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Write or edit content here...',
  minHeight = '320px'
}) => {
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  // Sync value to editable div when not typing
  useEffect(() => {
    if (editorRef.current && !isHtmlMode) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || '';
      }
    }
  }, [value, isHtmlMode]);

  const executeCommand = (command: string, arg: string | undefined = undefined) => {
    if (isHtmlMode) return;
    document.execCommand(command, false, arg);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const insertLink = () => {
    const url = prompt('Enter the link URL (e.g. https://... or /programmes):');
    if (url) {
      executeCommand('createLink', url);
    }
  };

  const insertImage = () => {
    const url = prompt('Enter Image URL:');
    if (url) {
      executeCommand('insertImage', url);
    }
  };

  const insertTable = () => {
    const tableHtml = `
      <table class="w-full border-collapse border border-slate-300 my-4 text-left">
        <thead>
          <tr class="bg-slate-100">
            <th class="border border-slate-300 p-2 font-semibold">Header 1</th>
            <th class="border border-slate-300 p-2 font-semibold">Header 2</th>
            <th class="border border-slate-300 p-2 font-semibold">Header 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-slate-300 p-2">Data 1</td>
            <td class="border border-slate-300 p-2">Data 2</td>
            <td class="border border-slate-300 p-2">Data 3</td>
          </tr>
          <tr>
            <td class="border border-slate-300 p-2">Data 4</td>
            <td class="border border-slate-300 p-2">Data 5</td>
            <td class="border border-slate-300 p-2">Data 6</td>
          </tr>
        </tbody>
      </table>
    `;
    executeCommand('insertHTML', tableHtml);
  };

  const insertBlockquote = () => {
    const quoteHtml = `<blockquote class="p-4 border-l-4 border-amber-500 bg-amber-50 rounded-r-lg my-4 italic text-slate-800">Add quotation here...</blockquote>`;
    executeCommand('insertHTML', quoteHtml);
  };

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-800/20 focus-within:border-blue-700 transition-all">
      {/* Toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap items-center gap-1 text-slate-700 select-none">
        <button
          type="button"
          onClick={() => executeCommand('undo')}
          title="Undo"
          className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors"
        >
          <Undo className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('redo')}
          title="Redo"
          className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors"
        >
          <Redo className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-slate-300 mx-1" />

        {/* Headings */}
        <button
          type="button"
          onClick={() => executeCommand('formatBlock', '<h1>')}
          title="Heading 1"
          className="p-1.5 hover:bg-slate-200 rounded text-slate-700 font-bold transition-colors"
        >
          <Heading1 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('formatBlock', '<h2>')}
          title="Heading 2"
          className="p-1.5 hover:bg-slate-200 rounded text-slate-700 font-bold transition-colors"
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('formatBlock', '<h3>')}
          title="Heading 3"
          className="p-1.5 hover:bg-slate-200 rounded text-slate-700 font-bold transition-colors"
        >
          <Heading3 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('formatBlock', '<p>')}
          title="Paragraph"
          className="p-1.5 hover:bg-slate-200 rounded text-slate-700 transition-colors"
        >
          <Type className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-slate-300 mx-1" />

        {/* Formatting */}
        <button
          type="button"
          onClick={() => executeCommand('bold')}
          title="Bold"
          className="p-1.5 hover:bg-slate-200 rounded text-slate-700 font-bold transition-colors"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('italic')}
          title="Italic"
          className="p-1.5 hover:bg-slate-200 rounded text-slate-700 italic transition-colors"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('underline')}
          title="Underline"
          className="p-1.5 hover:bg-slate-200 rounded text-slate-700 underline transition-colors"
        >
          <Underline className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-slate-300 mx-1" />

        {/* Alignment */}
        <button
          type="button"
          onClick={() => executeCommand('justifyLeft')}
          title="Align Left"
          className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('justifyCenter')}
          title="Align Center"
          className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors"
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('justifyRight')}
          title="Align Right"
          className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors"
        >
          <AlignRight className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('justifyFull')}
          title="Justify"
          className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors"
        >
          <AlignJustify className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-slate-300 mx-1" />

        {/* Lists & Embeds */}
        <button
          type="button"
          onClick={() => executeCommand('insertUnorderedList')}
          title="Bullet List"
          className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('insertOrderedList')}
          title="Numbered List"
          className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={insertBlockquote}
          title="Quote"
          className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors"
        >
          <Quote className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={insertLink}
          title="Insert Link"
          className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors"
        >
          <LinkIcon className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={insertImage}
          title="Insert Image URL"
          className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors"
        >
          <ImageIcon className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={insertTable}
          title="Insert Table"
          className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors"
        >
          <TableIcon className="w-4 h-4" />
        </button>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsHtmlMode(!isHtmlMode)}
            className={`px-2.5 py-1 text-xs font-semibold rounded flex items-center gap-1 transition-colors ${
              isHtmlMode 
                ? 'bg-blue-900 text-white' 
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            {isHtmlMode ? <Eye className="w-3.5 h-3.5" /> : <Code className="w-3.5 h-3.5" />}
            {isHtmlMode ? 'Visual Editor' : 'HTML Code'}
          </button>
        </div>
      </div>

      {/* Content Area */}
      {isHtmlMode ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste or write raw HTML code here..."
          className="w-full p-4 font-mono text-sm bg-slate-900 text-amber-300 focus:outline-none resize-y"
          style={{ minHeight }}
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onBlur={handleInput}
          data-placeholder={placeholder}
          className="p-4 focus:outline-none prose prose-slate max-w-none min-h-[250px] leading-relaxed text-slate-800"
          style={{ minHeight }}
        />
      )}
    </div>
  );
};
