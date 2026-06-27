"use client";

import {
  SunMedium,
  CircleUserRound,
} from "lucide-react";

import NavbarSwitcher from "./NavbarSwitcher";

export default function Navbar() {
  return (
    <header className="w-full flex items-center justify-between px-8">
      {/* LEFT */}
      <NavbarSwitcher />

      {/* RIGHT */}
      <div className="flex items-center gap-6">
        <SunMedium className="cursor-pointer" />

        <CircleUserRound className="cursor-pointer" />
      </div>
    </header>
  );
}