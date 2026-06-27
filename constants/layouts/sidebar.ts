import {
  LayoutDashboard,
  BookOpen,
  Wallet,
  Trophy,
  RefreshCw,
  Calculator,
  Bitcoin,
  LineChart,
  Bell,
} from "lucide-react";

export const sidebarItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    disabled: false,
  },

  {
    title: "Journal",
    icon: BookOpen,
    href: "/dashboard/journal",
    disabled: false,

    // children: [
    //   {
    //     title: "Daily Journal",
    //     href: "/dashboard/journal/daily-journal",
    //   },
    //   {
    //     title: "Trade History",
    //     href: "/dashboard/journal/trade-history",
    //   },
    // ],
  },

  {
    title: "Accounts",
    icon: Wallet,
    href: "/dashboard/accounts",
    disabled: true,
  },

  {
    title: "Leaderboard",
    icon: Trophy,
    href: "/dashboard/leaderboard",
    disabled: true,
  },

  {
    title: "Trade Sync",
    icon: RefreshCw,
    href: "/dashboard/trade-sync",
    disabled: true,
  },

  {
    title: "Calculators",
    icon: Calculator,
    href: "/dashboard/calculators",
    disabled: true,
  },

  {
    title: "Crypto",
    icon: Bitcoin,
    href: "/dashboard/crypto",
    disabled: true,
  },

  {
    title: "Charts",
    icon: LineChart,
    href: "/dashboard/charts",
    disabled: true,
  },

  {
    title: "Alerts",
    icon: Bell,
    href: "/dashboard/alerts",
    badge: "Pro",
    disabled: true,
  },
];