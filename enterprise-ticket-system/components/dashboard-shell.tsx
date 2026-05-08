import Link from "next/link";
import { Bell, LifeBuoy, Plus, Search, ShieldCheck } from "lucide-react";

import { navigationItems } from "../lib/navigation";

type DashboardShellProps = {
  activePath: string;
  eyebrow: string;
  title: string;
  description: string;
  connectionNote: string;
  children: React.ReactNode;
};

export function DashboardShell({
  activePath,
  eyebrow,
  title,
  description,
  connectionNote,
  children,
}: DashboardShellProps) {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 border-r border-white/10 bg-slate-950 px-5 py-6 lg:block">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 shadow-lg shadow-brand-600/20">
              <LifeBuoy className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="font-bold tracking-tight text-white">EnterpriseDesk</p>
              <p className="text-xs text-slate-400">ITSM Command Suite</p>
            </div>
          </div>

          <nav className="mt-8 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = item.href === activePath;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    active
                      ? "bg-white text-slate-950 shadow-sm"
                      : "text-slate-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 rounded-2xl border border-brand-400/20 bg-brand-500/10 p-4">
            <div className="flex items-center gap-2 text-brand-100">
              <ShieldCheck className="h-4 w-4" />
              <p className="text-sm font-semibold">MongoDB Connected</p>
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-400">{connectionNote}</p>
          </div>
        </aside>

        <section className="flex-1 bg-slate-100 text-slate-950">
          <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="flex items-center justify-between gap-4 px-5 py-4 lg:px-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">{eyebrow}</p>
                <h1 className="text-2xl font-bold tracking-tight text-slate-950">{title}</h1>
                <p className="mt-1 text-sm text-slate-500">{description}</p>
              </div>

              <div className="hidden flex-1 justify-center md:flex">
                <div className="flex w-full max-w-md items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-500">
                  <Search className="h-4 w-4" />
                  <span className="text-sm">Search tickets, users, departments...</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 shadow-sm hover:bg-slate-50">
                  <Bell className="h-5 w-5" />
                </button>
                <button className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700">
                  <Plus className="h-4 w-4" />
                  New Ticket
                </button>
              </div>
            </div>
          </header>

          <div className="px-5 py-6 lg:px-8">{children}</div>
        </section>
      </div>
    </main>
  );
}