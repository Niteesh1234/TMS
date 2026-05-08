"use client";

import { useMemo, useState } from "react";
import { Building2, Search, Users } from "lucide-react";

import type { DashboardTicketRecord } from "../types/dashboard";

type CustomersInteractiveProps = {
  tickets: DashboardTicketRecord[];
};

export function CustomersInteractive({ tickets }: CustomersInteractiveProps) {
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filteredTickets = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return tickets.filter((ticket) => {
      if (!normalizedQuery) {
        return true;
      }

      return [ticket.requester, ticket.company, ticket.status, ticket.priority, ticket.owner]
        .some((value) => value.toLowerCase().includes(normalizedQuery));
    });
  }, [tickets, query]);

  const displayedTickets = filteredTickets.slice(0, 24);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-sm backdrop-blur md:flex-row md:items-center md:justify-between">
        <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-500 md:min-w-[360px]">
          <Search className="h-4 w-4" />
          <input
            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search requesters, departments, owners..."
            value={query}
          />
        </label>

        <div className="inline-flex rounded-2xl border border-slate-200 bg-slate-50 p-1 text-sm">
          {(["grid", "list"] as const).map((mode) => (
            <button
              key={mode}
              className={`rounded-xl px-3 py-2 font-medium transition ${
                view === mode ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"
              }`}
              onClick={() => setView(mode)}
              type="button"
            >
              {mode === "grid" ? "Card View" : "Compact View"}
            </button>
          ))}
        </div>
      </div>

      <div className={view === "grid" ? "grid gap-6 lg:grid-cols-2" : "space-y-4"}>
        {displayedTickets.map((ticket) => (
          <div
            key={ticket.code}
            className="group rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-lg font-bold text-slate-950">{ticket.requester}</p>
                <p className="mt-1 text-sm text-slate-500">{ticket.company}</p>
              </div>
              <div className="rounded-2xl bg-brand-50 p-3 text-brand-700 transition group-hover:scale-105">
                <Users className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-5 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-slate-400">Current Status</p>
                <p className="mt-1 font-semibold text-slate-900">{ticket.status}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-slate-400">Priority</p>
                <p className="mt-1 font-semibold text-slate-900">{ticket.priority}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
              <span>{ticket.code}</span>
              <span>{ticket.owner}</span>
            </div>
          </div>
        ))}

        <div className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-xl shadow-slate-300/20">
          <div className="flex items-center gap-3">
            <Building2 className="h-5 w-5 text-emerald-400" />
            <h2 className="font-bold">Enterprise customer visibility</h2>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Departments and requesters shown here come from the same MongoDB-backed ticket records used across the dashboard.
          </p>
          <p className="mt-4 text-sm text-slate-400">
            Showing {displayedTickets.length} of {filteredTickets.length} matching customer records.
          </p>
        </div>
      </div>
    </div>
  );
}