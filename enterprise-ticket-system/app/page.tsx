import {
  Activity,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Filter,
  Gauge,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Ticket,
} from "lucide-react";

import { DashboardShell } from "../components/dashboard-shell";
import { getDashboardData } from "../lib/dashboard";

export const dynamic = "force-dynamic";

const metricIcons = {
  Ticket,
  ShieldCheck,
  Clock3,
  Gauge,
  BarChart3,
};

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

export default async function HomePage() {
  const data = await getDashboardData();
  const metrics = data.metrics.map((metric) => ({
    ...metric,
    icon: metricIcons[metric.icon as keyof typeof metricIcons] ?? BarChart3,
  }));
  const tickets = data.tickets;
  const workflow = data.workflow;
  const teams = data.teams;

  return (
    <DashboardShell
      activePath="/"
      eyebrow="Operations Dashboard"
      title="Service Command Center"
      description="A live enterprise incident workspace powered by MongoDB-backed dashboard collections."
      connectionNote={`Live dashboard data is loading from ${data.source.databaseName} using ${data.source.collections.length} backend collections.`}
    >
            <section className="overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-xl shadow-slate-300/40">
              <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-slate-200">
                    <Activity className="h-3.5 w-3.5 text-emerald-400" />
                    Live enterprise operations overview
                  </div>
                  <h2 className="mt-5 max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
                    Resolve high-impact incidents before they affect business continuity.
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
                    A centralized ITSM dashboard for incident intake, SLA tracking, agent workload, and executive
                    visibility. This enterprise view is now powered by MongoDB-backed server data.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-300">Priority Risk</p>
                      <p className="mt-1 text-3xl font-bold">{data.summary.priorityRisk}</p>
                    </div>
                    <AlertTriangle className="h-9 w-9 text-amber-300" />
                  </div>
                  <div className="mt-5 h-2 rounded-full bg-white/10">
                    <div className="h-2 w-2/3 rounded-full bg-gradient-to-r from-emerald-400 via-amber-300 to-red-400" />
                  </div>
                  <p className="mt-3 text-xs text-slate-300">{data.summary.riskSummary}</p>
                </div>
              </div>
            </section>

            <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {metrics.map((metric) => {
                const Icon = metric.icon;

                return (
                  <div key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-500">{metric.label}</p>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950">{metric.value}</p>
                      </div>
                      <div className={`rounded-xl bg-gradient-to-br ${metric.accent} p-3 text-white shadow-sm`}>
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="mt-5 flex items-center justify-between text-sm">
                      <span className="font-semibold text-emerald-600">{metric.change}</span>
                      <span className="text-slate-500">{metric.helper}</span>
                    </div>
                  </div>
                );
              })}
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-[1.7fr_1fr]">
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-slate-200 p-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-950">Enterprise Ticket Queue</h2>
                    <p className="mt-1 text-sm text-slate-500">Prioritized incidents from global business units. {data.summary.ticketCount} live records loaded.</p>
                  </div>
                  <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                    <Filter className="h-4 w-4" />
                    Filter Queue
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {tickets.map((ticket) => (
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
              </div>

              <div className="space-y-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-950">Workflow Throughput</h2>
                  <p className="mt-1 text-sm text-slate-500">Ticket movement across operational stages from MongoDB-backed workflow records.</p>
                  <div className="mt-5 space-y-4">
                    {workflow.map((item) => (
                      <div key={item.label}>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="font-medium text-slate-700">{item.label}</span>
                          <span className="font-semibold text-slate-950">{item.value}</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-100">
                          <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${Math.min(item.value, 100)}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="font-bold text-slate-950">Backend Connection</h2>
                      <p className="text-sm text-slate-500">Live MongoDB records loaded into the UI</p>
                    </div>
                  </div>
                  <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                    <p className="font-semibold text-slate-900">Current backend collections:</p>
                    <ul className="mt-2 space-y-1">
                      {data.source.collections.map((collection) => (
                        <li key={collection}>• {collection}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-brand-600" />
                    <h2 className="font-bold text-slate-950">Enterprise Polish</h2>
                  </div>
                  <div className="mt-4 space-y-4">
                    {teams.map((team) => (
                      <div key={team.name} className="rounded-xl border border-slate-100 p-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold text-slate-800">{team.name}</span>
                          <span className="text-slate-500">{team.members} agents</span>
                        </div>
                        <div className="mt-3 h-2 rounded-full bg-slate-100">
                          <div className={`h-2 rounded-full ${team.color}`} style={{ width: team.load }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-brand-600" />
                    <h2 className="font-bold text-slate-950">Executive Notes</h2>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    This enterprise layout is now reading seeded records from MongoDB through the backend. The dashboard API is available at{" "}
                    <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">/api/dashboard</code>.
                  </p>
                </div>
              </div>
            </section>
    </DashboardShell>
  );
}
