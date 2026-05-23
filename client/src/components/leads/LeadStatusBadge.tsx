import Badge from '../ui/Badge';
import { LeadStatus, LeadSource } from '../../types/lead.types';

interface LeadStatusBadgeProps {
  status: LeadStatus;
}

export default function LeadStatusBadge({ status }: LeadStatusBadgeProps) {
  const statusColors: Record<LeadStatus, 'primary' | 'success' | 'warning' | 'danger' | 'info'> = {
    [LeadStatus.New]: 'info',
    [LeadStatus.Contacted]: 'warning',
    [LeadStatus.Qualified]: 'success',
    [LeadStatus.Lost]: 'danger',
  };

  return <Badge variant={statusColors[status]}>{status}</Badge>;
}

interface LeadSourceBadgeProps {
  source: LeadSource;
}

export function LeadSourceBadge({ source }: LeadSourceBadgeProps) {
  return <Badge variant="primary">{source}</Badge>;
}
