"use client";

import { useState } from "react";

import {
  Menu,
} from "lucide-react";

import { motion } from "framer-motion";

import SidebarItem from "./SidebarItem";

import { sidebarItems } from "@/constants/layouts/sidebar";

export default function Sidebar() {
  const [expanded, setExpanded] =
    useState(true);

  const [items, setItems] =
    useState(
      sidebarItems.map((item) => ({
        ...item,
        open: false,
      }))
    );

  const toggleItem = (
    index: number
  ) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              open: !item.open,
            }
          : item
      )
    );
  };

  return (
    <motion.aside
      animate={{
        width: expanded ? 250 : 85,
      }}
      className="flex h-screen flex-col border-r border-[#c7c7c9] bg-white"
    >
      {/* HEADER */}
      <div
        className={`flex h-15 items-center border-b border-[#c7c7c9]
        ${
          expanded
            ? "justify-between px-6"
            : "justify-center"
        }`}
      >
        {expanded && (
          <div className="overflow-hidden font-black tracking-tight">
            <span className="text-black">
              TRADER
            </span>

            <span className="text-[#2970FF]">
              STAIRS
            </span>
          </div>
        )}

        <button
          onClick={() =>
            setExpanded(!expanded)
          }
          className="flex h-10 w-10 items-center justify-center text-black"
        >
          <Menu size={26} />
        </button>
      </div>

      {/* MENU */}
      <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-none [&::-webkit-scrollbar]:hidden">
        <div className="flex flex-col gap-2">
          {items.map((item, index) => (
            <SidebarItem
              key={item.title}
              item={item}
              expanded={expanded}
              onToggle={() =>
                toggleItem(index)
              }
            />
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="border-t border-[#c7c7c9] p-4">
        <div className="flex items-center gap-3 p-3">
          <div className="h-10 w-10 rounded-full bg-blue-500" />

          {expanded && (
            <div>
              <p className="text-sm font-semibold text-black">
                Bagus
              </p>

              <p className="text-xs text-gray-500">
                Premium Plan
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}