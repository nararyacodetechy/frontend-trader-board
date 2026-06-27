"use client";

type Props = {
  open: boolean;

  onClose: () => void;

  tags: string[];

  newTag: string;

  setNewTag: (
    value: string
  ) => void;

  handleAddTag: () => void;

  handleDeleteTag: (
    tag: string
  ) => void;
};

export default function TagManagerModal({
  open,
  onClose,
  tags,
  newTag,
  setNewTag,
  handleAddTag,
  handleDeleteTag,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="flex max-h-[90vh] w-full max-w-md flex-col p-6 bg-white rounded-lg">
        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Manage Tags
          </h2>

          <button
            onClick={onClose}
            className="text-black"
          >
            ✕
          </button>
        </div>

        {/* ADD TAG */}
        <div className="mb-6 flex gap-2 border border-gray-300 rounded-md">
          <input
            value={newTag}
            onChange={(e) =>
              setNewTag(e.target.value)
            }
            placeholder="New tag..."
            className="h-11 flex-1 rounded-lg border border-white/10 bg-white/5 px-4 outline-none"
          />

          <button
            onClick={handleAddTag}
            className="rounded-tr-md rounded-br-md bg-black px-4 text-white font-bold"
          >
            +
          </button>
        </div>

        {/* TAG LIST */}
        <div className="space-y-2 overflow-y-auto pr-1">
          {tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center justify-between rounded-lg border border-black/10 bg-white/5 px-4 py-3"
            >
              <span>{tag}</span>

              <button
                onClick={() =>
                  handleDeleteTag(tag)
                }
                className="text-red-400 hover:text-red-300"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}