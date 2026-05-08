import { Database, Settings, SlidersHorizontal } from "lucide-react";

import { DashboardShell } from "../../components/dashboard-shell";
import { getDashboardData } from "../../lib/dashboard";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const data = await getDashboardData();

  const settingsCards = [
    {
      title: "Database Target",
      value: data.source.databaseName,
      icon: Database,
      description: "The active MongoDB database configured for the enterprise workspace.",
    },
    {
      title: "Collections Online",
      value: String(data.source.collections.length),
      icon: SlidersHorizontal,
      description: "Collections currently powering the dashboard and routed enterprise sections.",
    },
    {
      title: "Application Mode",
      value: "Enterprise UI",
      icon: Settings,
      description: "Sidebar routes are now connected to working pages rather than placeholder anchors.",
    },
  ];

  return (
    <DashboardShell
      activePath="/settings"
      eyebrow="Workspace Configuration"
      title="Platform Settings"
      description="Inspect the current app target, enabled enterprise sections, and backend data footprint."
      connectionNote="Settings now reflects live backend configuration instead of a placeholder tab."
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {settingsCards.map((card) => {
          const Icon = card.icon;

          return (
            <div key={card.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">{card.title}</p>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950">{card.value}</p>
                </div>
                <div className="rounded-xl bg-brand-50 p-3 text-brand-700">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">{card.description}</p>
            </div>
          );
        })}
      </div>
    </DashboardShell>
  );
}