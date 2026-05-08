export type DashboardMetricRecord = {
  id: string;
  label: string;
  value: string;
  change: string;
  helper: string;
  icon: string;
  accent: string;
  sortOrder: number;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type DashboardTicketRecord = {
  id: string;
  code: string;
  title: string;
  requester: string;
  company: string;
  priority: string;
  status: string;
  owner: string;
  sla: string;
  sortOrder: number;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type WorkflowStageRecord = {
  id: string;
  label: string;
  value: number;
  color: string;
  sortOrder: number;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type SupportTeamRecord = {
  id: string;
  name: string;
  load: string;
  members: number;
  color: string;
  sortOrder: number;
  createdAt: Date | string;
  updatedAt: Date | string;
};