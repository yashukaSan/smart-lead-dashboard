import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2 } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import LeadStatusBadge, { LeadSourceBadge } from '../components/leads/LeadStatusBadge';
import LeadModal from '../components/leads/LeadModal';
import Spinner from '../components/ui/Spinner';
import Button from '../components/ui/Button';
import { useLeads } from '../hooks/useLeads';
import { useAuth } from '../hooks/useAuth';
import type { Lead, CreateLeadRequest } from '../types/lead.types';
import { leadService } from '../services/lead.service';
import toast from 'react-hot-toast';

export default function LeadDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { updateLead, deleteLead } = useLeads();

  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    const fetchLead = async () => {
      if (!id) return;
      try {
        const fetchedLead = await leadService.getLeadById(id);
        setLead(fetchedLead);
      } catch (error) {
        toast.error('Failed to load lead details');
        navigate('/leads');
      } finally {
        setLoading(false);
      }
    };

    fetchLead();
  }, [id, navigate]);

  const handleUpdateLead = async (data: CreateLeadRequest) => {
    if (!lead) return;
    setModalLoading(true);
    try {
      const updatedLead = await updateLead(lead._id, data);
      setLead(updatedLead);
      toast.success('Lead updated successfully');
      setIsModalOpen(false);
    } catch {
      toast.error('Failed to update lead');
    } finally {
      setModalLoading(false);
    }
  };

  const handleDeleteLead = async () => {
    if (!lead || !confirm('Are you sure you want to delete this lead?')) return;
    try {
      await deleteLead(lead._id);
      toast.success('Lead deleted successfully');
      navigate('/leads');
    } catch {
      toast.error('Failed to delete lead');
    }
  };

  const isAdmin = user?.role === 'admin';

  if (loading) {
    return (
      <DashboardLayout>
        <Spinner />
      </DashboardLayout>
    );
  }

  if (!lead) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-gray-500">Lead not found</p>
          <Button
            variant="secondary"
            onClick={() => navigate('/leads')}
            className="mt-4"
          >
            Go back to leads
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/leads')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Go back"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{lead.name}</h1>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Name</p>
              <p className="text-lg font-semibold text-gray-900">{lead.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="text-lg font-semibold text-gray-900">{lead.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Status</p>
              <LeadStatusBadge status={lead.status} />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Source</p>
              <LeadSourceBadge source={lead.source} />
            </div>
          </div>

          <hr className="my-4" />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Created By</p>
              <p className="text-gray-900">{lead.createdBy}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Created At</p>
              <p className="text-gray-900">
                {new Date(lead.createdAt).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Last Updated</p>
              <p className="text-gray-900">
                {new Date(lead.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>

          <hr className="my-4" />

          <div className="flex gap-3">
            <Button
              variant="primary"
              onClick={() => setIsModalOpen(true)}
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Lead
            </Button>
            {isAdmin && (
              <Button
                variant="danger"
                onClick={handleDeleteLead}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Lead
              </Button>
            )}
          </div>
        </div>

        <LeadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleUpdateLead}
          lead={lead}
          loading={modalLoading}
        />
      </div>
    </DashboardLayout>
  );
}
