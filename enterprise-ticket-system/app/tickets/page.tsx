import { ChevronRight, Filter, Inbox, Ticket } from "lucide-react";

import { DashboardShell } from "../../components/dashboard-shell";
import { getDashboardData } from "../../lib/dashboard";

export const dynamic = "force-dynamic";

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

export default async function TicketsPage() {
  const data = await getDashboardData();

  return (
    <DashboardShell
      activePath="/tickets"
      eyebrow="Ticket Operations"
      title="Enterprise Ticket Queue"
      description="Review live incidents, priorities, owners, and SLA commitments across the business."
      connectionNote={`Displaying ${data.tickets.length} live ticket records from MongoDB.`}
    >
      <div className="grid gap-6 xl:grid-cols-[1.8fr_1fr]">
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-200 p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-950">Active Queue</h2>
              <p className="mt-1 text-sm text-slate-500">Synchronized from the `dashboard_tickets` collection.</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              <Filter className="h-4 w-4" />
              Filter Queue
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {data.tickets.map((ticket) => (
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
                <span className="font-semibold text-slate-950">{data.summary.ticketCount}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                <span>Priority risk</span>
                <span className="font-semibold text-slate-950">{data.summary.priorityRisk}</span>
              </div>
              <div className="rounded-xl bg-slate-50 px-4 py-3">{data.summary.riskSummary}</div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
            <div className="flex items-center gap-3">
              <Inbox className="h-5 w-5 text-emerald-400" />
              <h2 className="font-bold">Routing is active</h2>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              The sidebar now opens a dedicated Ticket Queue route instead of a placeholder link.
            </p>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}