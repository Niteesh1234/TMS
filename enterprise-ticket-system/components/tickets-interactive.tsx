"use client";

import { useMemo, useState } from "react";
import { ChevronRight, Filter, Search, Ticket } from "lucide-react";

import type { DashboardTicketRecord } from "../types/dashboard";

type TicketsInteractiveProps = {
  tickets: DashboardTicketRecord[];
  summary: {
    ticketCount: number;
    priorityRisk: string;
    riskSummary: string;
  };
  initialSearch?: string;
  createdCode?: string;
};

const PAGE_SIZE = 12;

function getPriorityClass(priority: string) {
  switch (priority) {
    case "Critical":
      return "bg-red-50 text-red-700 ring-red-200";
    case "High":
      return "bg-orange-50 text-orange-700 ring-orange-200";
    case "Medium":
      return "bg-amber-50 text-amber-700 ring-amber-200";
    default:
      return "bg-slate-100 text-slate-700 ring-slate-200";
  }
}

export function TicketsInteractive({ tickets, summary, initialSearch = "", createdCode }: TicketsInteractiveProps) {
  const [search, setSearch] = useState(initialSearch);
  const [priority, setPriority] = useState("All");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);

  const priorities = useMemo(() => ["All", ...Array.from(new Set(tickets.map((ticket) => ticket.priority)))], [tickets]);
  const statuses = useMemo(() => ["All", ...Array.from(new Set(tickets.map((ticket) => ticket.status)))], [tickets]);

  const filteredTickets = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tickets.filter((ticket) => {
      const matchesSearch =
        query.length === 0 ||
        [ticket.code, ticket.title, ticket.requester, ticket.company, ticket.owner].some((value) =>
          value.toLowerCase().includes(query),
        );

      const matchesPriority = priority === "All" || ticket.priority === priority;
      const matchesStatus = status === "All" || ticket.status === status;

      return matchesSearch && matchesPriority && matchesStatus;
    });
  }, [tickets, search, priority, status]);

  const totalPages = Math.max(1, Math.ceil(filteredTickets.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginatedTickets = filteredTickets.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const featuredTicket = paginatedTickets[0] ?? filteredTickets[0] ?? tickets[0];

  const resetFilters = () => {
    setSearch("");
    setPriority("All");
    setStatus("All");
    setPage(1);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.8fr_1fr]">
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        {createdCode ? (
          <div className="border-b border-emerald-100 bg-emerald-50 px-5 py-3 text-sm font-medium text-emerald-700">
            Ticket {createdCode} was created successfully and added to MongoDB.
          </div>
        ) : null}

        <div className="flex flex-col gap-4 border-b border-slate-200 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-950">Active Queue</h2>
              <p className="mt-1 text-sm text-slate-500">Synchronized from the `dashboard_tickets` collection.</p>
            </div>
            <button
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              onClick={resetFilters}
              type="button"
            >
              <Filter className="h-4 w-4" />
              Reset Filters
            </button>
          </div>

          <div className="grid gap-3 md:grid-cols-[1.5fr_1fr_1fr]">
            <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-500">
              <Search className="h-4 w-4" />
              <input
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Search code, title, requester..."
                value={search}
              />
            </label>

            <select
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none"
              onChange={(event) => {
                setPriority(event.target.value);
                setPage(1);
              }}
              value={priority}
            >
              {priorities.map((value) => (
                <option key={value} value={value}>
                  {value} Priority
                </option>
              ))}
            </select>

            <select
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none"
              onChange={(event) => {
                setStatus(event.target.value);
                setPage(1);
              }}
              value={status}
            >
              {statuses.map((value) => (
                <option key={value} value={value}>
                  {value} Status
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {paginatedTickets.map((ticket) => (
            <div key={ticket.code} className="grid gap-4 p-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-brand-600">{ticket.code}</span>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${getPriorityClass(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                    {ticket.status}
                  </span>
                </div>
                <h3 className="mt-2 font-semibold text-slate-950">{ticket.title}</h3>
                <p className="mt-1 text-sm text-slate-500">
                  {ticket.requester} · {ticket.company}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 lg:justify-end">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">Owner</p>
                  <p className="font-semibold text-slate-800">{ticket.owner}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">SLA</p>
                  <p className="font-semibold text-red-600">{ticket.sla}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-300" />
              </div>
            </div>
          ))}

          {paginatedTickets.length === 0 && (
            <div className="p-8 text-center text-sm text-slate-500">No tickets match your current filters.</div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4 text-sm text-slate-600">
          <span>
            Showing {paginatedTickets.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1}–
            {Math.min(safePage * PAGE_SIZE, filteredTickets.length)} of {filteredTickets.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              className="rounded-lg border border-slate-200 px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={safePage === 1}
              onClick={() => setPage((value) => Math.max(1, value - 1))}
              type="button"
            >
              Prev
            </button>
            <span className="rounded-lg bg-slate-100 px-3 py-1.5 font-medium text-slate-700">
              Page {safePage} / {totalPages}
            </span>
            <button
              className="rounded-lg border border-slate-200 px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={safePage === totalPages}
              onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
              type="button"
            >
              Next
            </button>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-brand-50 p-3 text-brand-700">
              <Ticket className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-950">Queue Summary</h2>
              <p className="text-sm text-slate-500">Live backend snapshot</p>
            </div>
          </div>
          <div className="mt-5 space-y-3 text-sm text-slate-600">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <span>Total tickets</span>
              <span className="font-semibold text-slate-950">{summary.ticketCount}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <span>Priority risk</span>
              <span className="font-semibold text-slate-950">{summary.priorityRisk}</span>
            </div>
            <div className="rounded-xl bg-slate-50 px-4 py-3">{summary.riskSummary}</div>
          </div>
        </div>

        {featuredTicket && (
          <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Featured Ticket</p>
            <p className="mt-3 text-lg font-bold">{featuredTicket.code}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{featuredTicket.title}</p>
            <div className="mt-4 grid gap-3 text-sm text-slate-300">
              <div className="flex items-center justify-between">
                <span>Requester</span>
                <span className="font-medium text-white">{featuredTicket.requester}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Owner</span>
                <span className="font-medium text-white">{featuredTicket.owner}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>SLA</span>
                <span className="font-medium text-amber-300">{featuredTicket.sla}</span>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}