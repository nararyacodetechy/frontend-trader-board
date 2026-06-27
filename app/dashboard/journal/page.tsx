"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Clock3,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const trades = [
  {
    id: 1,
    title: "FIRST TRADE",
    pair: "XAU/USD",
    session: "LONDON",
    result: "WIN",
    type: "BUY",
    open: "09:10",
    close: "09:42",
    rr: "1 : 3",
    pnl: "+2.4%",
    image:
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "SECOND TRADE",
    pair: "GBP/JPY",
    session: "NEW YORK",
    result: "LOSS",
    type: "SELL",
    open: "10:05",
    close: "10:27",
    rr: "1 : 2",
    pnl: "-1.1%",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "THIRD TRADE",
    pair: "EUR/USD",
    session: "LONDON",
    result: "WIN",
    type: "BUY",
    open: "11:18",
    close: "11:44",
    rr: "1 : 4",
    pnl: "+3.8%",
    image:
      "https://images.unsplash.com/photo-1642052502075-5f4f4d7d05f9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "FOURTH TRADE",
    pair: "NAS100",
    session: "NEW YORK",
    result: "LOSS",
    type: "SELL",
    open: "13:02",
    close: "13:40",
    rr: "1 : 1.5",
    pnl: "-0.8%",
    image:
      "https://images.unsplash.com/photo-1639815188546-c43c240ff4df?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "FIFTH TRADE",
    pair: "BTC/USD",
    session: "ASIA",
    result: "WIN",
    type: "BUY",
    open: "14:10",
    close: "14:36",
    rr: "1 : 5",
    pnl: "+5.2%",
    image:
      "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "SIXTH TRADE",
    pair: "USD/JPY",
    session: "ASIA",
    result: "WIN",
    type: "SELL",
    open: "15:01",
    close: "15:20",
    rr: "1 : 2",
    pnl: "+1.4%",
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function JournalPage() {
  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="mx-auto">
        {/* PAGE HEADER */}
        <div className="mb-4 shadow-md flex flex-col gap-5 rounded-md bg-white p-4 md:flex-row md:items-center md:justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            {/* DATE BOX */}
            <div className="flex min-w-22.5 flex-col items-center justify-center rounded-md bg-black px-4 py-3 text-white">
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">
                Today
              </p>

              <h2 className="mt-1 text-2xl font-bold leading-none">
                11
              </h2>

              <p className="mt-1 text-xs font-medium text-white/70">
                Thursday
              </p>
            </div>

            {/* TITLE */}
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-black/40">
                Trade Board
              </p>

              <h1 className="mt-1 text-lg font-semibold text-black">
                Daily Trade Analysis
              </h1>

              <p className="mt-1 text-sm text-black/50">
                June 11, 2026
              </p>
            </div>
          </div>

          {/* BUTTON */}
          <Link
            href="/dashboard/journal/plan"
            className="mr-4  flex w-fit items-center gap-3 rounded-md bg-black px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
          >
            ADD ANALYSIS DAY
            <ArrowRight size={18} />
          </Link>
        </div>
  
        {/* GRID */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {trades.map((trade) => {
            const isWin = trade.result === "WIN";
  
            return (
              <Link
                key={trade.id}
                href={`/dashboard/journal/trade/${trade.id}`}
                className="shadow-md rounded-md bg-white p-4 text-black transition hover:-translate-y-1"
              >
                {/* HEADER */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-black/40">
                      Trade #{trade.id}
                    </p>
  
                    <p className="mt-1 text-sm font-bold">
                      {trade.title}
                    </p>
                  </div>
  
                  <div className="text-right">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">
                      Trade Time
                    </p>
  
                    <p className="mt-1 text-sm font-semibold">
                      {trade.open} - {trade.close}
                    </p>
                  </div>
                </div>
  
                {/* IMAGE */}
                <div className="relative mt-4 h-44 overflow-hidden rounded-md">
                  <img
                    src={trade.image}
                    alt={trade.title}
                    className="h-full w-full object-cover"
                  />
  
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
  
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">
                      Pair
                    </p>
  
                    <h2 className="mt-1 text-2xl font-bold">
                      {trade.pair}
                    </h2>
                  </div>
                </div>
  
                {/* CONTENT */}
                <div
                  className={`mt-4 rounded-md p-4 ${
                    isWin
                      ? "bg-emerald-100 text-emerald-950"
                      : "bg-red-100 text-red-950"
                  }`}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-60">
                        Position
                      </p>
  
                      <p className="mt-1 text-sm font-bold">
                        {trade.type}
                      </p>
                    </div>
  
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-60">
                        Result
                      </p>
  
                      <p className="mt-1 text-sm font-bold">
                        {trade.result}
                      </p>
                    </div>
  
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-60">
                        Risk Reward
                      </p>
  
                      <p className="mt-1 text-sm font-bold">
                        {trade.rr}
                      </p>
                    </div>
  
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-60">
                        PNL
                      </p>
  
                      <p className="mt-1 text-sm font-bold">
                        {trade.pnl}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}