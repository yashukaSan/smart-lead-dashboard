import { useEffect, useState, useCallback } from 'react';
import type { Lead, LeadsResponse, CreateLeadRequest, LeadFilters } from '../types/lead.types';
import { leadService } from '../services/lead.service';
import { useDebounce } from './useDebounce';

interface LeadsState {
  leads: Lead[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

export function useLeads(autoRefreshInterval: number = 5000) {
  const [state, setState] = useState<LeadsState>({
    leads: [],
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
    loading: false,
    error: null,
  });

  const [filters, setFilters] = useState<LeadFilters>({});
  const debouncedSearch = useDebounce(filters.search, 500);

  const fetchLeads = useCallback(
    async (currentFilters?: LeadFilters, currentPage: number = 1) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const response: LeadsResponse = await leadService.getLeads(
          currentFilters || filters,
          currentPage,
          state.limit
        );
        setState((prev) => ({
          ...prev,
          leads: response.data,
          total: response.pagination.total,
          page: response.pagination.page,
          totalPages: response.pagination.totalPages,
          loading: false,
        }));
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch leads';
        setState((prev) => ({ ...prev, loading: false, error: message }));
      }
    },
    [filters, state.limit]
  );

  useEffect(() => {
    fetchLeads(filters, 1);
  }, [debouncedSearch, filters.status, filters.source, filters.sort]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchLeads(filters, state.page);
    }, autoRefreshInterval);

    return () => clearInterval(interval);
  }, [fetchLeads, filters, state.page, autoRefreshInterval]);

  const createLead = useCallback(
    async (data: CreateLeadRequest) => {
      try {
        const newLead = await leadService.createLead(data);
        setState((prev) => ({
          ...prev,
          leads: [newLead, ...prev.leads],
          total: prev.total + 1,
        }));
        return newLead;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to create lead';
        setState((prev) => ({ ...prev, error: message }));
        throw err;
      }
    },
    []
  );

  const updateLead = useCallback(
    async (id: string, data: Partial<CreateLeadRequest>) => {
      try {
        const updated = await leadService.updateLead(id, data);
        setState((prev) => ({
          ...prev,
          leads: prev.leads.map((lead) => (lead._id === id ? updated : lead)),
        }));
        return updated;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to update lead';
        setState((prev) => ({ ...prev, error: message }));
        throw err;
      }
    },
    []
  );

  const deleteLead = useCallback(
    async (id: string) => {
      try {
        await leadService.deleteLead(id);
        setState((prev) => ({
          ...prev,
          leads: prev.leads.filter((lead) => lead._id !== id),
          total: prev.total - 1,
        }));
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to delete lead';
        setState((prev) => ({ ...prev, error: message }));
        throw err;
      }
    },
    []
  );

  const exportCSV = useCallback(async () => {
    try {
      const blob = await leadService.exportLeads(filters);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to export CSV';
      setState((prev) => ({ ...prev, error: message }));
      throw err;
    }
  }, [filters]);

  const setPage = useCallback((page: number) => {
    setState((prev) => ({ ...prev, page }));
    fetchLeads(filters, page);
  }, [fetchLeads, filters]);

  const updateFilters = useCallback((newFilters: LeadFilters) => {
    setFilters(newFilters);
    setState((prev) => ({ ...prev, page: 1 }));
  }, []);

  return {
    ...state,
    filters,
    updateFilters,
    setPage,
    fetchLeads,
    createLead,
    updateLead,
    deleteLead,
    exportCSV,
  };
}
