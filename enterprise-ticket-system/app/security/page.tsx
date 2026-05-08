import { LockKeyhole, ShieldCheck } from "lucide-react";

import { DashboardShell } from "../../components/dashboard-shell";
import { getDashboardData } from "../../lib/dashboard";

export const dynamic = "force-dynamic";

const securityControls = [
  {
    title: "Role-aligned access posture",
    description: "Security leadership can review dashboard exposure and validate access boundaries for operational data.",
  },
  {
    title: "Collection awareness",
    description: "The app surfaces the active backend collections so data ownership stays visible to platform teams.",
  },
  {
    title: "Operational signal review",
    description: "Priority incidents can be reviewed through a dedicated route instead of inactive placeholder navigation.",
  },
];

export default async function SecurityPage() {
  const data = await getDashboardData();

  return (
    <DashboardShell
      activePath="/security"
      eyebrow="Security Operations"
      title="Security Control Center"
      description="Review enterprise posture, protected data surfaces, and active dashboard collection visibility."
      connectionNote={`Security view can inspect ${data.source.collections.length} backend collections in ${data.source.databaseName}.`}
    >
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <section className="space-y-4">
          {securityControls.map((control) => (
            <div key={control.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h2 className="font-bold text-slate-950">{control.title}</h2>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{control.description}</p>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
          <div className="flex items-center gap-3">
            <LockKeyhole className="h-5 w-5 text-amber-300" />
            <h2 className="font-bold">Protected Collections</h2>
          </div>
          <ul className="mt-5 space-y-3 text-sm text-slate-300">
            {data.source.collections.map((collection) => (
              <li key={collection} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                {collection}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </DashboardShell>
  );
}