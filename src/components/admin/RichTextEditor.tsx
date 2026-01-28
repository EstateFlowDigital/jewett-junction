import React, { useRef, useEffect, useCallback, useState, memo } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Link,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Quote,
  Minus,
  RemoveFormatting,
  ChevronDown,
  Type
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
}

// Toolbar button - memoized and defined outside component
const ToolbarButton = memo(({
  onClick,
  icon: Icon,
  title,
  isActive = false,
  disabled = false
}: {
  onClick: () => void;
  icon: React.ElementType;
  title: string;
  isActive?: boolean;
  disabled?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    disabled={disabled}
    className={`p-1.5 rounded-md transition-colors ${
      disabled
        ? 'text-slate-600 cursor-not-allowed'
        : isActive
          ? 'bg-blue-500/30 text-blue-400'
          : 'text-slate-400 hover:text-white hover:bg-slate-600/50'
    }`}
  >
    <Icon size={16} />
  </button>
));

ToolbarButton.displayName = 'ToolbarButton';

// Heading dropdown component
const HeadingDropdown = memo(({ onSelect }: { onSelect: (tag: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const headings = [
    { tag: '<p>', label: 'Paragraph', className: 'text-sm' },
    { tag: '<h2>', label: 'Heading 2', className: 'text-lg font-bold' },
    { tag: '<h3>', label: 'Heading 3', className: 'text-base font-bold' },
    { tag: '<h4>', label: 'Heading 4', className: 'text-sm font-bold' },
    { tag: '<h5>', label: 'Heading 5', className: 'text-xs font-bold' },
  ];

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-600/50 transition-colors"
        title="Text style"
      >
        <Type size={16} />
        <ChevronDown size={12} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-xl z-50 py-1 min-w-[140px]">
          {headings.map(({ tag, label, className }) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                onSelect(tag);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-1.5 text-white hover:bg-slate-700 transition-colors ${className}`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

HeadingDropdown.displayName = 'HeadingDropdown';

export default function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isUserTyping = useRef(false);
  const lastValue = useRef(value);

  // Only sync from parent when value actually changes externally
  useEffect(() => {
    if (editorRef.current && value !== lastValue.current && !isUserTyping.current) {
      editorRef.current.innerHTML = value || '';
      lastValue.current = value;
    }
  }, [value]);

  // Handle content changes - debounced
  const handleInput = useCallback(() => {
    if (editorRef.current) {
      isUserTyping.current = true;
      const html = editorRef.current.innerHTML;

      // Clean up empty editor
      let cleanHtml = html;
      if (html === '<br>' || html === '<div><br></div>' || html === '<p><br></p>') {
        cleanHtml = '';
      }

      lastValue.current = cleanHtml;
      onChange(cleanHtml);

      // Reset typing flag after a short delay
      setTimeout(() => {
        isUserTyping.current = false;
      }, 100);
    }
  }, [onChange]);

  // Execute formatting commands - optimized
  const execCommand = useCallback((command: string, commandValue?: string) => {
    // Preserve selection
    const selection = window.getSelection();
    const range = selection?.rangeCount ? selection.getRangeAt(0) : null;

    document.execCommand(command, false, commandValue);

    // Restore focus
    editorRef.current?.focus();

    // Restore selection if it was lost
    if (range && selection) {
      try {
        selection.removeAllRanges();
        selection.addRange(range);
      } catch (e) {
        // Selection might be invalid, ignore
      }
    }

    // Update content
    handleInput();
  }, [handleInput]);

  // Handle link insertion
  const insertLink = useCallback(() => {
    const selection = window.getSelection();
    const selectedText = selection?.toString() || '';
    const url = prompt('Enter URL:', 'https://');

    if (url && url !== 'https://') {
      if (selectedText) {
        execCommand('createLink', url);
      } else {
        // Insert link with URL as text if no selection
        const linkHtml = `<a href="${url}" target="_blank">${url}</a>`;
        execCommand('insertHTML', linkHtml);
      }
    }
  }, [execCommand]);

  // Handle heading selection
  const handleHeadingSelect = useCallback((tag: string) => {
    execCommand('formatBlock', tag);
  }, [execCommand]);

  // Clear formatting
  const clearFormatting = useCallback(() => {
    execCommand('removeFormat');
    execCommand('formatBlock', '<p>');
  }, [execCommand]);

  // Insert horizontal rule
  const insertHorizontalRule = useCallback(() => {
    execCommand('insertHorizontalRule');
  }, [execCommand]);

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          execCommand('bold');
          break;
        case 'i':
          e.preventDefault();
          execCommand('italic');
          break;
        case 'u':
          e.preventDefault();
          execCommand('underline');
          break;
        case 'z':
          if (e.shiftKey) {
            e.preventDefault();
            execCommand('redo');
          }
          break;
      }
    }
  }, [execCommand]);

  return (
    <div className={`bg-slate-900/50 border border-slate-600/50 rounded-xl overflow-hidden ${className || ''}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-slate-600/50 bg-slate-800/50">
        {/* Undo/Redo */}
        <div className="flex items-center gap-0.5 pr-2 mr-1 border-r border-slate-600/50">
          <ToolbarButton onClick={() => execCommand('undo')} icon={Undo} title="Undo (Ctrl+Z)" />
          <ToolbarButton onClick={() => execCommand('redo')} icon={Redo} title="Redo (Ctrl+Shift+Z)" />
        </div>

        {/* Heading dropdown */}
        <div className="pr-2 mr-1 border-r border-slate-600/50">
          <HeadingDropdown onSelect={handleHeadingSelect} />
        </div>

        {/* Text formatting */}
        <div className="flex items-center gap-0.5 pr-2 mr-1 border-r border-slate-600/50">
          <ToolbarButton onClick={() => execCommand('bold')} icon={Bold} title="Bold (Ctrl+B)" />
          <ToolbarButton onClick={() => execCommand('italic')} icon={Italic} title="Italic (Ctrl+I)" />
          <ToolbarButton onClick={() => execCommand('underline')} icon={Underline} title="Underline (Ctrl+U)" />
          <ToolbarButton onClick={() => execCommand('strikeThrough')} icon={Strikethrough} title="Strikethrough" />
        </div>

        {/* Lists */}
        <div className="flex items-center gap-0.5 pr-2 mr-1 border-r border-slate-600/50">
          <ToolbarButton onClick={() => execCommand('insertUnorderedList')} icon={List} title="Bullet List" />
          <ToolbarButton onClick={() => execCommand('insertOrderedList')} icon={ListOrdered} title="Numbered List" />
          <ToolbarButton onClick={() => execCommand('formatBlock', '<blockquote>')} icon={Quote} title="Block Quote" />
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-0.5 pr-2 mr-1 border-r border-slate-600/50">
          <ToolbarButton onClick={() => execCommand('justifyLeft')} icon={AlignLeft} title="Align Left" />
          <ToolbarButton onClick={() => execCommand('justifyCenter')} icon={AlignCenter} title="Align Center" />
          <ToolbarButton onClick={() => execCommand('justifyRight')} icon={AlignRight} title="Align Right" />
        </div>

        {/* Insert */}
        <div className="flex items-center gap-0.5 pr-2 mr-1 border-r border-slate-600/50">
          <ToolbarButton onClick={insertLink} icon={Link} title="Insert Link" />
          <ToolbarButton onClick={insertHorizontalRule} icon={Minus} title="Horizontal Line" />
        </div>

        {/* Clear */}
        <div className="flex items-center gap-0.5">
          <ToolbarButton onClick={clearFormatting} icon={RemoveFormatting} title="Clear Formatting" />
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        data-placeholder={placeholder || 'Start typing...'}
        className="min-h-[200px] max-h-[400px] overflow-y-auto p-4 text-white focus:outline-none
          [&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-slate-500 [&:empty]:before:pointer-events-none
          [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-4 [&_h2]:mb-2
          [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-white [&_h3]:mt-3 [&_h3]:mb-2
          [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-white [&_h4]:mt-3 [&_h4]:mb-1
          [&_h5]:text-base [&_h5]:font-semibold [&_h5]:text-slate-200 [&_h5]:mt-2 [&_h5]:mb-1
          [&_p]:my-2 [&_p]:leading-relaxed
          [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-2
          [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-2
          [&_li]:my-1
          [&_a]:text-blue-400 [&_a]:underline [&_a]:hover:text-blue-300
          [&_strong]:font-bold [&_b]:font-bold
          [&_em]:italic [&_i]:italic
          [&_u]:underline
          [&_s]:line-through [&_strike]:line-through
          [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:pl-4 [&_blockquote]:py-1 [&_blockquote]:my-3 [&_blockquote]:italic [&_blockquote]:text-slate-300 [&_blockquote]:bg-slate-800/30
          [&_hr]:border-slate-600 [&_hr]:my-4"
      />
    </div>
  );
}
