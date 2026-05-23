import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Download } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import LeadsTable from '../components/leads/LeadsTable';
import LeadModal from '../components/leads/LeadModal';
import FilterBar from '../components/leads/FilterBar';
import Pagination from '../components/ui/Pagination';
import Button from '../components/ui/Button';
import { useLeads } from '../hooks/useLeads';
import { useAuth } from '../hooks/useAuth';
import { Lead, CreateLeadRequest } from '../types/lead.types';
import toast from 'react-hot-toast';

export default function Leads() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    leads,
    loading,
    error,
    page,
    totalPages,
    setPage,
    updateFilters,
    filters,
    createLead,
    updateLead,
    deleteLead,
    exportCSV,
  } = useLeads();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | undefined>();
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleCreateLead = async (data: CreateLeadRequest) => {
    setModalLoading(true);
    try {
      await createLead(data);
      toast.success('Lead created successfully');
      setIsModalOpen(false);
      setEditingLead(undefined);
    } catch {
      toast.error('Failed to create lead');
    } finally {
      setModalLoading(false);
    }
  };

  const handleUpdateLead = async (data: CreateLeadRequest) => {
    if (!editingLead) return;
    setModalLoading(true);
    try {
      await updateLead(editingLead._id, data);
      toast.success('Lead updated successfully');
      setIsModalOpen(false);
      setEditingLead(undefined);
    } catch {
      toast.error('Failed to update lead');
    } finally {
      setModalLoading(false);
    }
  };

  const handleDeleteLead = async (id: string) => {
    try {
      await deleteLead(id);
      toast.success('Lead deleted successfully');
    } catch {
      toast.error('Failed to delete lead');
    }
  };

  const handleExportCSV = async () => {
    try {
      await exportCSV();
      toast.success('Leads exported successfully');
    } catch {
      toast.error('Failed to export leads');
    }
  };

  const handleOpenModal = (lead?: Lead) => {
    setEditingLead(lead);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingLead(undefined);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
          <div className="flex gap-3">
            {isAdmin && (
              <Button
                variant="secondary"
                onClick={handleExportCSV}
                disabled={loading}
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            )}
            <Button onClick={() => handleOpenModal()} disabled={loading}>
              <Plus className="h-4 w-4 mr-2" />
              Add Lead
            </Button>
          </div>
        </div>

        <FilterBar filters={filters} onFiltersChange={updateFilters} />

        <LeadsTable
          leads={leads}
          loading={loading}
          onEdit={handleOpenModal}
          onDelete={handleDeleteLead}
          isAdmin={isAdmin}
        />

        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            isLoading={loading}
          />
        )}

        <LeadModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={editingLead ? handleUpdateLead : handleCreateLead}
          lead={editingLead}
          loading={modalLoading}
        />
      </div>
    </DashboardLayout>
  );
}
