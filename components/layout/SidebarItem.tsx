"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  item: any;
  expanded: boolean;
  onToggle?: () => void;
};

export default function SidebarItem({
  item,
  expanded,
  onToggle,
}: Props) {
  const pathname = usePathname();

  const Icon = item.icon;

  const isActive = (href?: string) => {
    if (!href) return false;

    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname.startsWith(href);
  };

  const baseClass = `group flex w-full items-center gap-3 px-4 py-3 transition-all`;

  const styleClass = item.disabled
    ? "cursor-not-allowed bg-[#F9FAFB] text-[#9CA3AF] opacity-70"
    : isActive(item.href)
    ? "bg-black text-white"
    : "text-gray/50 hover:bg-[#F3F4F6]";

  const content = (
    <div className={`rounded-md ${baseClass} ${styleClass}`}>
      <div className="shrink-0">
        <Icon size={20} />
      </div>

      {expanded && (
        <div className="flex flex-1 items-center justify-between">
          <span className="font-medium">{item.title}</span>

          {item.badge && (
            <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-md">
              {item.badge}
            </span>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div>
      {/* DISABLED */}
      {item.disabled ? (
        <div>{content}</div>
      ) : item.href && !item.children ? (
        /* NAVIGATION ITEM */
        <Link href={item.href}>{content}</Link>
      ) : (
        /* TOGGLE ITEM */
        <button onClick={onToggle} className="w-full text-left">
          {content}
        </button>
      )}

      {/* CHILDREN */}
      <AnimatePresence>
        {expanded && item.open && item.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="ml-8 mt-2 overflow-hidden"
          >
            <div className="flex flex-col gap-1 border-l border-gray-300 pl-5">
              {item.children.map((child: any, idx: number) => {
                const activeChild =
                  pathname === child.href;

                return (
                  <Link
                    key={idx}
                    href={child.href}
                    className={`flex items-center gap-3 py-2 text-sm transition ${
                      activeChild
                        ? "text-blue-500 font-semibold"
                        : "text-gray-500 hover:text-black"
                    }`}
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    {child.title}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}