import apiClient from '../lib/axios';
import { Lead, LeadsResponse, CreateLeadRequest, LeadFilters } from '../types/lead.types';

export const leadService = {
  async getLeads(filters?: LeadFilters, page = 1, limit = 10): Promise<LeadsResponse> {
    const params: Record<string, unknown> = { page, limit };
    if (filters?.search) params.search = filters.search;
    if (filters?.status) params.status = filters.status;
    if (filters?.source) params.source = filters.source;
    if (filters?.sort) params.sort = filters.sort;

    const response = await apiClient.get<LeadsResponse>('/leads', { params });
    return response.data;
  },

  async getLeadById(id: string): Promise<Lead> {
    const response = await apiClient.get<{ lead: Lead }>(`/leads/${id}`);
    return response.data.lead;
  },

  async createLead(data: CreateLeadRequest): Promise<Lead> {
    const response = await apiClient.post<{ lead: Lead }>('/leads', data);
    return response.data.lead;
  },

  async updateLead(id: string, data: Partial<CreateLeadRequest>): Promise<Lead> {
    const response = await apiClient.put<{ lead: Lead }>(`/leads/${id}`, data);
    return response.data.lead;
  },

  async deleteLead(id: string): Promise<void> {
    await apiClient.delete(`/leads/${id}`);
  },

  async exportLeads(filters?: LeadFilters): Promise<Blob> {
    const params: Record<string, unknown> = {};
    if (filters?.search) params.search = filters.search;
    if (filters?.status) params.status = filters.status;
    if (filters?.source) params.source = filters.source;

    const response = await apiClient.get('/leads/export', {
      params,
      responseType: 'blob',
    });
    return response.data;
  },
};
