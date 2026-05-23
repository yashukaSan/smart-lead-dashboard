import { Edit2, Trash2 } from 'lucide-react';
import type { Lead } from '../../types/lead.types';
import Button from '../ui/Button';
import EmptyState from '../ui/EmptyState';
import Spinner from '../ui/Spinner';
import LeadStatusBadge, { LeadSourceBadge } from './LeadStatusBadge';

interface LeadsTableProps {
  leads: Lead[];
  loading: boolean;
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
  isAdmin: boolean;
}

export default function LeadsTable({
  leads,
  loading,
  onEdit,
  onDelete,
  isAdmin,
}: LeadsTableProps) {
  if (loading && leads.length === 0) {
    return <Spinner />;
  }

  if (leads.length === 0) {
    return (
      <EmptyState
        title="No leads yet"
        description="Create your first lead to get started"
      />
    );
  }

  return (
    <>
      <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Source</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {leads.map((lead) => (
              <tr key={lead._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900">{lead.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{lead.email}</td>
                <td className="px-6 py-4 text-sm">
                  <LeadStatusBadge status={lead.status} />
                </td>
                <td className="px-6 py-4 text-sm">
                  <LeadSourceBadge source={lead.source} />
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(lead)}
                      className="p-1 hover:bg-blue-100 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="h-4 w-4 text-blue-600" />
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => {
                          if (confirm('Delete this lead?')) {
                            onDelete(lead._id);
                          }
                        }}
                        className="p-1 hover:bg-red-100 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {leads.map((lead) => (
          <div key={lead._id} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{lead.name}</h3>
                <p className="text-sm text-gray-600">{lead.email}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(lead)}
                  className="p-1 hover:bg-blue-100 rounded transition-colors"
                  title="Edit"
                >
                  <Edit2 className="h-4 w-4 text-blue-600" />
                </button>
                {isAdmin && (
                  <button
                    onClick={() => {
                      if (confirm('Delete this lead?')) {
                        onDelete(lead._id);
                      }
                    }}
                    className="p-1 hover:bg-red-100 rounded transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <LeadStatusBadge status={lead.status} />
              <LeadSourceBadge source={lead.source} />
              <span className="text-xs text-gray-500">
                {new Date(lead.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
