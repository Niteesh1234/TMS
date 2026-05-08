import { prisma } from "./prisma";

const DASHBOARD_COLLECTIONS = [
  "dashboard_metrics",
  "dashboard_tickets",
  "dashboard_workflow_stages",
  "dashboard_teams",
] as const;

export async function getDashboardData() {
  const [metrics, tickets, workflow, teams] = await Promise.all([
    prisma.dashboardMetric.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.dashboardTicket.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.workflowStage.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.supportTeam.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  const criticalTicketsCount = tickets.filter((ticket) => ticket.priority.toLowerCase() === "critical").length;
  const highPriorityTicketsCount = tickets.filter((ticket) =>
    ["critical", "high"].includes(ticket.priority.toLowerCase()),
  ).length;

  const priorityRisk = criticalTicketsCount >= 3 ? "High" : highPriorityTicketsCount >= 3 ? "Medium" : "Low";

  const riskSummary = criticalTicketsCount
    ? `${criticalTicketsCount} critical tickets require review in the next hour.`
    : "No critical tickets currently require immediate review.";

  return {
    source: {
      databaseName: "Mock_data",
      collections: DASHBOARD_COLLECTIONS,
    },
    summary: {
      priorityRisk,
      riskSummary,
      ticketCount: tickets.length,
      teamCount: teams.length,
    },
    metrics,
    tickets,
    workflow,
    teams,
  };
}