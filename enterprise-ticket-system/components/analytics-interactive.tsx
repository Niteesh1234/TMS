"use client";

import { useMemo, useState } from "react";
import { Activity, BarChart3, TrendingUp, Users } from "lucide-react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import type { DashboardMetricRecord, SupportTeamRecord, WorkflowStageRecord } from "../types/dashboard";

type AnalyticsInteractiveProps = {
  metrics: DashboardMetricRecord[];
  workflow: WorkflowStageRecord[];
  teams: SupportTeamRecord[];
  summary: {
    priorityRisk: string;
    riskSummary: string;
  };
};

export function AnalyticsInteractive({ metrics, workflow, teams, summary }: AnalyticsInteractiveProps) {
  const [activePanel, setActivePanel] = useState<"metrics" | "workflow" | "teams">("metrics");

  const workflowChartData = useMemo(
    () => workflow.map((item) => ({ name: item.label, value: item.value, color: item.color })),
    [workflow],
  );

  const strongestTeam = useMemo(
    () => [...teams].sort((a, b) => parseInt(b.load, 10) - parseInt(a.load, 10))[0],
    [teams],
  );

  const teamChartData = useMemo(
    () => teams.map((team) => ({ name: team.name, value: team.members, color: team.color })),
    [teams],
  );

  const chartColorMap: Record<string, string> = {
    "bg-blue-600": "#2563eb",
    "bg-indigo-600": "#4f46e5",
    "bg-amber-500": "#f59e0b",
    "bg-emerald-600": "#059669",
    "bg-emerald-500": "#10b981",
    "bg-blue-500": "#3b82f6",
    "bg-violet-500": "#8b5cf6",
    "bg-cyan-500": "#06b6d4",
    "bg-rose-500": "#f43f5e",
    "bg-indigo-500": "#6366f1",
    "bg-orange-500": "#f97316",
  };

  return (
    <div className="space-y-6">
      <div className="inline-flex rounded-2xl border border-slate-200 bg-white p-1 text-sm shadow-sm">
        {[
          { key: "metrics", label: "Metrics", icon: BarChart3 },
          { key: "workflow", label: "Workflow", icon: TrendingUp },
          { key: "teams", label: "Teams", icon: Users },
        ].map((item) => {
          const Icon = item.icon;
          const active = activePanel === item.key;

          return (
            <button
              key={item.key}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 font-medium transition ${
                active ? "bg-slate-950 text-white shadow-sm" : "text-slate-600"
              }`}
              onClick={() => setActivePanel(item.key as typeof activePanel)}
              type="button"
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </div>

      {activePanel === "metrics" && (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              <p className="text-sm font-medium text-slate-500">{metric.label}</p>
              <p className="mt-2 text-3xl font-bold text-slate-950">{metric.value}</p>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="font-semibold text-emerald-600">{metric.change}</span>
                <span className="text-slate-500">{metric.helper}</span>
              </div>
            </div>
          ))}
        </section>
      )}

      {activePanel === "workflow" && (
        <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
          <section className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              <h2 className="font-bold text-slate-950">Workflow Throughput</h2>
            </div>
            <div className="space-y-5">
              {workflow.map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">{item.label}</span>
                    <span className="font-semibold text-slate-950">{item.value}</span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-100">
                    <div className={`h-3 rounded-full ${item.color}`} style={{ width: `${Math.min(item.value, 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-brand-600" />
              <h2 className="font-bold text-slate-950">Workflow Distribution</h2>
            </div>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={workflowChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={100}
                    paddingAngle={3}
                  >
                    {workflowChartData.map((entry) => (
                      <Cell key={entry.name} fill={chartColorMap[entry.color] ?? "#64748b"} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`${value}`, "Tickets"]} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      )}

      {activePanel === "teams" && (
        <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <section className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <Users className="h-5 w-5 text-brand-600" />
              <h2 className="font-bold text-slate-950">Support Team Capacity</h2>
            </div>
            <div className="space-y-4">
              {teams.map((team) => (
                <div key={team.name} className="rounded-2xl border border-slate-100 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-800">{team.name}</span>
                    <span className="text-slate-500">{team.members} members</span>
                  </div>
                  <div className="mt-3 h-3 rounded-full bg-slate-100">
                    <div className={`h-3 rounded-full ${team.color}`} style={{ width: team.load }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-xl shadow-slate-300/20">
            <div className="flex items-center gap-3">
              <Activity className="h-5 w-5 text-emerald-400" />
              <h2 className="font-bold">Operational Spotlight</h2>
            </div>
            <p className="mt-5 text-xs uppercase tracking-[0.2em] text-slate-400">Top team load</p>
            <p className="mt-2 text-2xl font-bold">{strongestTeam?.name}</p>
            <p className="mt-1 text-sm text-slate-300">Current load: {strongestTeam?.load}</p>

            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-slate-400">Priority risk</p>
            <p className="mt-2 text-xl font-semibold">{summary.priorityRisk}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{summary.riskSummary}</p>

            <div className="mt-6 h-[220px] rounded-2xl bg-white/5 p-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={teamChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={75}
                  >
                    {teamChartData.map((entry) => (
                      <Cell key={entry.name} fill={chartColorMap[entry.color] ?? "#94a3b8"} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`${value}`, "Members"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}