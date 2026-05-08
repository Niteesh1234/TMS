import {
  BarChart3,
  Inbox,
  LayoutDashboard,
  LockKeyhole,
  Settings,
  Users,
} from "lucide-react";

export const navigationItems = [
  { label: "Command Center", href: "/", icon: LayoutDashboard },
  { label: "Ticket Queue", href: "/tickets", icon: Inbox },
  { label: "Customers", href: "/customers", icon: Users },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Security", href: "/security", icon: LockKeyhole },
  { label: "Settings", href: "/settings", icon: Settings },
] as const;