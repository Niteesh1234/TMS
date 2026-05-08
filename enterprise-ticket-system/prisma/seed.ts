import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const connectionString = process.env.DATABASE_URL ?? "mongodb://127.0.0.1:27017/Mock_data";

const departments = [
  "Finance Operations",
  "Platform Engineering",
  "People Operations",
  "Revenue Systems",
  "Customer Success",
  "Security Operations",
  "Business Intelligence",
  "Procurement",
  "Executive Support",
  "Legal Operations",
  "Infrastructure",
  "Corporate IT",
  "Field Services",
  "Product Delivery",
  "Compliance",
  "Digital Commerce",
] as const;

const firstNames = [
  "Sarah",
  "Michael",
  "Ava",
  "Daniel",
  "Nina",
  "Carlos",
  "Priya",
  "Jordan",
  "Sophia",
  "Elijah",
  "Emma",
  "Noah",
  "Olivia",
  "Mason",
  "Charlotte",
  "Liam",
] as const;

const lastNames = [
  "Johnson",
  "Chen",
  "Patel",
  "Brooks",
  "Rivera",
  "Morgan",
  "Kim",
  "Davis",
  "Taylor",
  "Wright",
  "Scott",
  "Bennett",
  "Campbell",
  "Reed",
  "Howard",
  "Diaz",
] as const;

const owners = [
  "A. Rivera",
  "N. Patel",
  "J. Kim",
  "L. Morgan",
  "C. Nguyen",
  "T. Brooks",
  "S. Ibrahim",
  "M. Torres",
  "R. Singh",
  "D. Carter",
  "P. Alvarez",
  "E. Foster",
] as const;

const priorities = ["Critical", "High", "Medium", "Low"] as const;
const statuses = ["Escalated", "In Progress", "Pending Approval", "Monitoring", "Resolved", "Triaged", "Open"] as const;
const issueTypes = [
  "VPN instability",
  "Payroll dashboard access failure",
  "Customer portal timeout",
  "SSO login disruption",
  "Endpoint compliance alert",
  "New hire provisioning request",
  "Email delivery delay",
  "Billing export timeout",
  "Service desk routing mismatch",
  "Data sync validation failure",
  "Warehouse scanner outage",
  "Identity verification incident",
] as const;

const teamDefinitions = [
  { name: "Tier 1 Support", members: 18, color: "bg-emerald-500", load: "76%" },
  { name: "Infrastructure", members: 12, color: "bg-amber-500", load: "89%" },
  { name: "Security Ops", members: 9, color: "bg-blue-500", load: "68%" },
  { name: "Identity Access", members: 7, color: "bg-violet-500", load: "71%" },
  { name: "Revenue Systems", members: 10, color: "bg-cyan-500", load: "74%" },
  { name: "Field Enablement", members: 8, color: "bg-rose-500", load: "63%" },
  { name: "Business Apps", members: 11, color: "bg-indigo-500", load: "81%" },
  { name: "Executive Support", members: 5, color: "bg-orange-500", load: "58%" },
] as const;

const now = new Date();

const tickets = Array.from({ length: 180 }, (_, index) => {
  const department = departments[index % departments.length];
  const requester = `${firstNames[index % firstNames.length]} ${lastNames[(index * 3) % lastNames.length]}`;
  const priority = priorities[index % priorities.length];
  const status = statuses[index % statuses.length];
  const issueType = issueTypes[index % issueTypes.length];
  const owner = owners[index % owners.length];
  const ageHours = (index % 12) + 1;
  const createdAt = new Date(now.getTime() - ageHours * 60 * 60 * 1000 - index * 11 * 60 * 1000);
  const updatedAt = new Date(createdAt.getTime() + 35 * 60 * 1000);
  const sla =
    priority === "Critical"
      ? `${30 + (index % 25)}m left`
      : priority === "High"
        ? `${1 + (index % 5)}h ${(index * 7) % 60}m left`
        : priority === "Medium"
          ? `${1 + (index % 3)}d ${(index * 4) % 8}h left`
          : `${2 + (index % 4)}d ${(index * 3) % 10}h left`;

  return {
    code: `ENT-${48000 + index}`,
    title: `${issueType} affecting ${department.toLowerCase()}`,
    requester,
    company: department,
    priority,
    status,
    owner,
    sla,
    sortOrder: index + 1,
    createdAt,
    updatedAt,
  };
});

const criticalCount = tickets.filter((ticket) => ticket.priority === "Critical").length;
const inProgressCount = tickets.filter((ticket) => ticket.status === "In Progress").length;
const resolvedCount = tickets.filter((ticket) => ticket.status === "Resolved").length;

const workflow = [
  { label: "New", value: 64, color: "bg-blue-600", sortOrder: 1, createdAt: now, updatedAt: now },
  { label: "Triaged", value: 82, color: "bg-indigo-600", sortOrder: 2, createdAt: now, updatedAt: now },
  { label: "In Progress", value: inProgressCount, color: "bg-amber-500", sortOrder: 3, createdAt: now, updatedAt: now },
  { label: "Resolved", value: resolvedCount, color: "bg-emerald-600", sortOrder: 4, createdAt: now, updatedAt: now },
];

const teams = teamDefinitions.map((team, index) => ({
  ...team,
  sortOrder: index + 1,
  createdAt: now,
  updatedAt: now,
}));

const seedPayload = {
  metrics: [
    {
      label: "Open Incidents",
      value: String(tickets.length),
      change: "+18.4%",
      helper: "Across all departments",
      icon: "Ticket",
      accent: "from-blue-600 to-indigo-600",
      sortOrder: 1,
      createdAt: now,
      updatedAt: now,
    },
    {
      label: "SLA Compliance",
      value: "98.6%",
      change: "+1.8%",
      helper: "Rolling 30 days",
      icon: "ShieldCheck",
      accent: "from-emerald-600 to-teal-600",
      sortOrder: 2,
      createdAt: now,
      updatedAt: now,
    },
    {
      label: "Avg. Resolution",
      value: "2h 58m",
      change: "-22m",
      helper: "Improved vs last week",
      icon: "Clock3",
      accent: "from-amber-500 to-orange-600",
      sortOrder: 3,
      createdAt: now,
      updatedAt: now,
    },
    {
      label: "Agent Utilization",
      value: "87%",
      change: "+6.2%",
      helper: `${teams.length} teams online`,
      icon: "Gauge",
      accent: "from-slate-700 to-slate-950",
      sortOrder: 4,
      createdAt: now,
      updatedAt: now,
    },
    {
      label: "Critical Escalations",
      value: String(criticalCount),
      change: "+9.4%",
      helper: "Needs leadership visibility",
      icon: "BarChart3",
      accent: "from-rose-600 to-red-700",
      sortOrder: 5,
      createdAt: now,
      updatedAt: now,
    },
    {
      label: "Departments Impacted",
      value: String(departments.length),
      change: "+3",
      helper: "Cross-functional support load",
      icon: "BarChart3",
      accent: "from-cyan-600 to-sky-700",
      sortOrder: 6,
      createdAt: now,
      updatedAt: now,
    },
  ],
  tickets,
  workflow,
  teams,
};

async function main() {
  const script = `
    const payload = ${JSON.stringify(seedPayload)};
    payload.metrics = payload.metrics.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
    }));
    payload.tickets = payload.tickets.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
    }));
    payload.workflow = payload.workflow.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
    }));
    payload.teams = payload.teams.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
    }));
    db.getSiblingDB('Mock_data').dashboard_metrics.deleteMany({});
    db.getSiblingDB('Mock_data').dashboard_tickets.deleteMany({});
    db.getSiblingDB('Mock_data').dashboard_workflow_stages.deleteMany({});
    db.getSiblingDB('Mock_data').dashboard_teams.deleteMany({});
    db.getSiblingDB('Mock_data').dashboard_metrics.insertMany(payload.metrics);
    db.getSiblingDB('Mock_data').dashboard_tickets.insertMany(payload.tickets);
    db.getSiblingDB('Mock_data').dashboard_workflow_stages.insertMany(payload.workflow);
    db.getSiblingDB('Mock_data').dashboard_teams.insertMany(payload.teams);
    print('Seeded enterprise dashboard collections in Mock_data.');
  `;

  const { stdout } = await execFileAsync("mongosh", [connectionString, "--quiet", "--eval", script], {
    env: process.env,
  });

  console.log(stdout.trim());
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });