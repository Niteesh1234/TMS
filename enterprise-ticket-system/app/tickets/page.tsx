import { DashboardShell } from "../../components/dashboard-shell";
import { TicketsInteractive } from "../../components/tickets-interactive";
import { getDashboardData } from "../../lib/dashboard";

export const dynamic = "force-dynamic";

export default async function TicketsPage({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    created?: string;
  };
}) {
  const data = await getDashboardData();

  return (
    <DashboardShell
      activePath="/tickets"
      eyebrow="Ticket Operations"
      title="Enterprise Ticket Queue"
      description="Review live incidents, priorities, owners, and SLA commitments across the business."
      connectionNote={`Displaying ${data.tickets.length} live ticket records from MongoDB.`}
    >
      <TicketsInteractive
        summary={data.summary}
        tickets={data.tickets}
        initialSearch={searchParams?.search ?? ""}
        createdCode={searchParams?.created}
      />
    </DashboardShell>
  );
}