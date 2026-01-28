import React, { useRef, useEffect, useCallback } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Link, AlignLeft, AlignCenter, Heading2, Undo, Redo } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
}

export default function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInternalChange = useRef(false);

  // Initialize editor content
  useEffect(() => {
    if (editorRef.current && !isInternalChange.current) {
      // Only update if the content is different
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || '';
      }
    }
    isInternalChange.current = false;
  }, [value]);

  // Handle content changes
  const handleInput = useCallback(() => {
    if (editorRef.current) {
      isInternalChange.current = true;
      const html = editorRef.current.innerHTML;
      // Clean up empty editor
      if (html === '<br>' || html === '<div><br></div>') {
        onChange('');
      } else {
        onChange(html);
      }
    }
  }, [onChange]);

  // Execute formatting commands
  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  // Handle link insertion
  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  // Toolbar button component
  const ToolbarButton = ({
    onClick,
    icon: Icon,
    title,
    isActive = false
  }: {
    onClick: () => void;
    icon: React.ElementType;
    title: string;
    isActive?: boolean;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded-lg transition-all hover:bg-slate-600/50 ${
        isActive ? 'bg-blue-500/30 text-blue-400' : 'text-slate-400 hover:text-white'
      }`}
    >
      <Icon size={18} />
    </button>
  );

  // Check if command is active
  const isActive = (command: string) => {
    try {
      return document.queryCommandState(command);
    } catch {
      return false;
    }
  };

  return (
    <div className={`bg-slate-900/50 border border-slate-600/50 rounded-xl overflow-hidden ${className || ''}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-slate-600/50 bg-slate-800/50">
        <div className="flex items-center gap-1 pr-2 border-r border-slate-600/50">
          <ToolbarButton onClick={() => execCommand('undo')} icon={Undo} title="Undo" />
          <ToolbarButton onClick={() => execCommand('redo')} icon={Redo} title="Redo" />
        </div>

        <div className="flex items-center gap-1 px-2 border-r border-slate-600/50">
          <ToolbarButton
            onClick={() => execCommand('bold')}
            icon={Bold}
            title="Bold (Ctrl+B)"
            isActive={isActive('bold')}
          />
          <ToolbarButton
            onClick={() => execCommand('italic')}
            icon={Italic}
            title="Italic (Ctrl+I)"
            isActive={isActive('italic')}
          />
          <ToolbarButton
            onClick={() => execCommand('underline')}
            icon={Underline}
            title="Underline (Ctrl+U)"
            isActive={isActive('underline')}
          />
        </div>

        <div className="flex items-center gap-1 px-2 border-r border-slate-600/50">
          <ToolbarButton
            onClick={() => execCommand('formatBlock', '<h2>')}
            icon={Heading2}
            title="Heading"
          />
        </div>

        <div className="flex items-center gap-1 px-2 border-r border-slate-600/50">
          <ToolbarButton
            onClick={() => execCommand('insertUnorderedList')}
            icon={List}
            title="Bullet List"
            isActive={isActive('insertUnorderedList')}
          />
          <ToolbarButton
            onClick={() => execCommand('insertOrderedList')}
            icon={ListOrdered}
            title="Numbered List"
            isActive={isActive('insertOrderedList')}
          />
        </div>

        <div className="flex items-center gap-1 px-2 border-r border-slate-600/50">
          <ToolbarButton
            onClick={() => execCommand('justifyLeft')}
            icon={AlignLeft}
            title="Align Left"
          />
          <ToolbarButton
            onClick={() => execCommand('justifyCenter')}
            icon={AlignCenter}
            title="Align Center"
          />
        </div>

        <div className="flex items-center gap-1 pl-2">
          <ToolbarButton
            onClick={insertLink}
            icon={Link}
            title="Insert Link"
          />
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onBlur={handleInput}
        data-placeholder={placeholder || 'Start typing...'}
        className="min-h-[200px] max-h-[400px] overflow-y-auto p-4 text-white focus:outline-none prose prose-invert prose-sm max-w-none
          [&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-slate-500 [&:empty]:before:pointer-events-none
          [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mt-4 [&_h2]:mb-2
          [&_p]:my-2
          [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2
          [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2
          [&_li]:my-1
          [&_a]:text-blue-400 [&_a]:underline [&_a]:hover:text-blue-300
          [&_strong]:font-bold [&_b]:font-bold
          [&_em]:italic [&_i]:italic
          [&_u]:underline"
      />
    </div>
  );
}
