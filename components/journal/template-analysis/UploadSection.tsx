import { Upload, X } from "lucide-react";

type Props = {
  image: string;
  timeframe: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  handleUpload: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleRemoveImage: () => void;
};

export default function UploadSection({
  image,
  timeframe,
  inputRef,
  handleUpload,
  handleRemoveImage,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <p className="text-sm font-semibold">
          Chart Capture
        </p>
        <p className="text-xs">
          Your analysis capture is stored here
        </p>
      </div>

      <div
        onClick={() =>
          !image &&
          inputRef.current?.click()
        }
        className="group relative flex cursor-pointer overflow-hidden rounded-xl border border-dashed"
      >
        {image ? (
          <>
            <img
              src={image}
              alt="preview"
              className="h-full w-full object-cover"
            />

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveImage();
              }}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition group-hover:opacity-100"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <div className="flex h-64 w-full flex-col items-center justify-center p-4">
            <Upload
              size={30}
              className="mb-3 text-gray-600"
            />

            <p className="text-sm text-gray-600">
              Upload chart for {timeframe} Timeframe
            </p>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={handleUpload}
      />
    </div>
  );
}