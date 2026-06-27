"use client";

import { Lock, Play } from "lucide-react";

interface JournalFooterProps {
  title: string;
  description: string;
  buttonText: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function JournalFooter({
  title,
  description,
  buttonText,
  disabled = false,
  onClick,
}: JournalFooterProps) {
  return (
    <div className="sticky bottom-0 z-20 border-t border-gray-400 bg-white backdrop-blur shadow-lg">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <p className="font-semibold">
            {title}
          </p>

          <p className="text-sm text-gray-500">
            {description}
          </p>
        </div>

        <button
          onClick={onClick}
          disabled={disabled}
          className={`flex items-center gap-2 rounded-xl px-5 py-3 font-medium transition
          ${
            disabled
              ? "cursor-not-allowed bg-gray-100 text-gray-400"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {disabled ? (
            <Lock size={18} />
          ) : (
            <Play size={18} />
          )}

          {buttonText}
        </button>
      </div>
    </div>
  );
}