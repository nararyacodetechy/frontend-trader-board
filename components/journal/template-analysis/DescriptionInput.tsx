"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import CharacterCount from "@tiptap/extension-character-count";
import { useEffect, useState } from "react";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  ListChecks,
  Strikethrough, 
  Undo, 
  Redo, 
  FileText, 
  Save
} from "lucide-react";
import { DescriptionTemplate } from "@/types/journal/template-analysis";
import { descriptionTemplates } from "@/constants/analysis/descriptionTemplate";

type Props = {
  value: string;
  onChange: (value: string) => void;
  timeframe: string;
};

export default function DescriptionInput({
  value,
  onChange,
  timeframe,
}: Props) {
  const MAX = 5000;

  const [activeList, setActiveList] = useState<"bullet" | "ordered" | "task">("bullet");

  const [status, setStatus] = useState<
    "saved" | "unsaved" | "saving"
  >("saved");

  // TEMPLATE MODAL
  const [isTemplateModalOpen, setIsTemplateModalOpen] =
    useState(false);

  const [templateName, setTemplateName] =
    useState("");

  const [templateDescription, setTemplateDescription] =
    useState("");

  const [templateContent, setTemplateContent] =
    useState("");

  const [listOpen, setListOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [highlightOpen, setHighlightOpen] = useState(false);

  const insertTemplate = (
    template: DescriptionTemplate
  ) => {
    editor
      .chain()
      .focus()
      .insertContent({
        type: "paragraph",
        content: template.content.map(
          (item) => ({
            type: "text",
            text: item.text,
            marks: [
              ...(item.bold
                ? [{ type: "bold" }]
                : []),
              ...(item.italic
                ? [{ type: "italic" }]
                : []),
              ...(item.underline
                ? [{ type: "underline" }]
                : []),
            ],
          })
        ),
      })
      .run();
  };

  const [open, setOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color.configure({
        types: ['textStyle'],
      }),
      Highlight.configure({ multicolor: true }),
      CharacterCount.configure({
        limit: MAX,
      }),
      Placeholder.configure({
        placeholder: "Write your detail strategy here...",
        showOnlyWhenEditable: true,
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();

      onChange(html);
      setStatus("unsaved");
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value]);

  const handleSave = () => {
    setStatus("saving");

    setTimeout(() => {
      setStatus("saved");
    }, 500);
  };

  if (!editor) return null;

  const used = editor.storage.characterCount.characters();

  return (
    <div className="">
      {/* HEADER */}
      <div className="flex flex-col gap-2">
        <div>
          <p className="text-sm font-semibold">
            Notes
          </p>
          <p className="text-xs">
            Describe your strategy in this timeframe here
          </p>
        </div>

        {/* TOOLBAR */}
        <div className="flex items-center justify-between gap-2 border border-gray-300 rounded-tl-md rounded-tr-md">
          <div className="flex">
            {/* UNDO */}
            <button
              title="Undo (Ctrl + Z)"
              disabled={!editor.can().undo()}
              onClick={() => editor.chain().focus().undo().run()}
              className={`p-2 rounded ${
                editor.can().undo()
                  ? "hover:bg-gray-100"
                  : "opacity-30 cursor-not-allowed"
              }`}
            >
              <Undo size={16} />
            </button>

            {/* REDO */}
            <button
              title="Redo (Ctrl + Y)"
              disabled={!editor.can().redo()}
              onClick={() => editor.chain().focus().redo().run()}
              className={`p-2 rounded ${
                editor.can().redo()
                  ? "hover:bg-gray-100"
                  : "opacity-30 cursor-not-allowed"
              }`}
            >
              <Redo size={16} />
            </button>

            {/* BOLD */}
            <button
              title="Bold (Ctrl + B)"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <Bold size={16} />
            </button>

            {/* ITALIC */}
            <button
              title="Italic (Ctrl + I)"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <Italic size={16} />
            </button>

            {/* UNDERLINE */}
            <button
              title="Underline (Ctrl + U"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <UnderlineIcon size={16} />
            </button>

            <div className="relative py-1">
              <button
                title="List Options"
                onClick={() => setListOpen(!listOpen)}
                className="px-2 text-sm hover:bg-gray-100 rounded p-2"
              >
                {activeList === "bullet" && <List size={16} />}
                {activeList === "ordered" && <ListOrdered size={16} />}
                {activeList === "task" && <ListChecks size={16} />}
              </button>

              {listOpen && (
                <div className="absolute top-10 left-0 z-50 bg-white border border-gray-300 rounded-md shadow-lg p-1 w-40">
                  
                  {/* BULLET */}
                  <button
                    title="Bullet List"
                    onClick={() => {
                      editor.chain().focus().toggleBulletList().run();
                      setActiveList("bullet");
                      setListOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-2 py-1 hover:bg-gray-100 rounded"
                  >
                    <List size={14} />
                    Bullet List
                  </button>

                  {/* ORDERED */}
                  <button
                    title="Number List"
                    onClick={() => {
                      editor.chain().focus().toggleOrderedList().run();
                      setActiveList("ordered");
                      setListOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-2 py-1 hover:bg-gray-100 rounded"
                  >
                    <ListOrdered size={14} />
                    Number List
                  </button>

                  {/* TASK LIST */}
                  <button
                    title="Task List"
                    onClick={() => {
                      editor.chain().focus().toggleTaskList().run();
                      setActiveList("task");
                      setListOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-2 py-1 hover:bg-gray-100 rounded"
                  >
                    <ListChecks size={14} />
                    Task List
                  </button>

                </div>
              )}
            </div>

            {/* STRIKE */}
            <button
              title="Strikethrough"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <Strikethrough size={16} />
            </button>

            {/* TEXT COLOR */}
            <div className="relative py-2">
              <button
                title="Text Color"
                onClick={() => setColorOpen(!colorOpen)}
                className="px-2 text-sm"
              >
                A▾
              </button>

              {colorOpen && (
                <div className="w-24 absolute top-10 left-0 z-50 bg-white border border-gray-300 rounded-md shadow-lg p-1">
                  <div className="grid grid-cols-4 gap-1">
                    {[
                      "#000000","#ef4444","#f97316","#f59e0b",
                      "#eab308","#84cc16","#22c55e","#10b981",
                      "#14b8a6","#06b6d4","#3b82f6","#6366f1",
                      "#8b5cf6","#d946ef","#ec4899","#6b7280",
                    ].map((color) => (
                      <button
                        key={color}
                        title={`Color ${color}`}
                        onClick={() => {
                          editor.chain().focus().setColor(color).run();
                          setColorOpen(false);
                        }}
                        className="w-4 h-4 hover:border hover:border-blue-400"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* HIGHLIGHT */}
            <div className="relative py-2">
              <button
                title="Highlight Color"
                onClick={() => setHighlightOpen(!highlightOpen)}
                className="px-2 text-sm"
              >
                H▾
              </button>

              {highlightOpen && (
                <div className="w-24 absolute top-10 left-0 z-50 bg-white border border-gray-300 rounded-md shadow-lg p-1">
                  <div className="grid grid-cols-4 gap-1 items-center justify-center">
                    {[
                      "#fef08a","#fde047","#facc15","#fbbf24",
                      "#fb7185","#f43f5e","#a78bfa","#c084fc",
                      "#60a5fa","#38bdf8","#34d399","#22c55e",
                      "#4ade80","#bef264","#fde68a","#e5e7eb",
                    ].map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          editor.chain().focus().toggleHighlight({ color }).run();
                          setHighlightOpen(false);
                        }}
                        className="w-4 h-4 hover:border hover:border-blue-400"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex">
            {/* TEMPLATE DROPDOWN */}
            <div className="relative group">
              <button
                title="Templates"
                onClick={() => setOpen(!open)}
                className="flex justify-center items-center p-2 hover:bg-gray-100 rounded"
              >
                <FileText size={16} />
                <p>▾</p>
              </button>

              {open && (
                <div className="absolute right-0 top-9 z-50 w-72 overflow-hidden rounded-md border border-gray-300 bg-white shadow-lg">
                  <button
                    onClick={() => {
                      setOpen(false);
                      setIsTemplateModalOpen(true);
                    }}
                    className="w-full border-b border-gray-200 px-3 py-3 text-left text-sm font-medium text-blue-600 hover:bg-gray-50"
                  >
                    + Create Template
                  </button>
                  {descriptionTemplates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => {
                        insertTemplate(template);
                        setOpen(false);
                      }}
                      className="flex w-full flex-col items-start px-4 py-3 text-left hover:bg-gray-50"
                    >
                      <span className="font-medium text-gray-900">
                        {template.label}
                      </span>

                      {template.description && (
                        <span className="text-xs text-gray-500">
                          {template.description}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* SAVE BUTTON */}
            <button
              title="Save"
              onClick={handleSave}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <Save size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* EDITOR */}
      <div className="border border-gray-300 text-sm leading-relaxed">
        <EditorContent editor={editor} />
      </div>

      {/* FOOTER */}
      <div className="border border-gray-300 rounded-b-md p-2 flex justify-between text-xs text-gray-500">
        <div>
          {status === "saved" && "Saved"}
          {status === "unsaved" && "Unsaved changes"}
          {status === "saving" && "Saving..."}
        </div>

        <div>
          {used} / {MAX}
        </div>
      </div>
    </div>
  );
}