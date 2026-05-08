import { AnalyticsInteractive } from "../../components/analytics-interactive";
import { DashboardShell } from "../../components/dashboard-shell";
import { getDashboardData } from "../../lib/dashboard";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const data = await getDashboardData();

  return (
    <DashboardShell
      activePath="/analytics"
      eyebrow="Service Intelligence"
      title="Analytics & Throughput"
      description="Monitor enterprise metrics, workflow distribution, and operational throughput from live backend data."
      connectionNote={`Analytics is powered by ${data.metrics.length} metrics and ${data.workflow.length} workflow stages.`}
    >
      <AnalyticsInteractive metrics={data.metrics} summary={data.summary} teams={data.teams} workflow={data.workflow} />
    </DashboardShell>
  );
}