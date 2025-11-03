import { api } from '@/lib/api';
import type { AuditlogResponseDto, CreateAuditlogDto, UpdateAuditlogDto } from '@saas-template/core';

export const auditlogsService = {
  async getAll(): Promise<AuditlogResponseDto[]> {
    const response = await api.get('/auditlogs');
    return response.data;
  },

  async getById(id: string): Promise<AuditlogResponseDto> {
    const response = await api.get(`/auditlogs/${id}`);
    return response.data;
  },

  async create(data: CreateAuditlogDto): Promise<AuditlogResponseDto> {
    const response = await api.post('/auditlogs', data);
    return response.data;
  },

  async update(id: string, data: UpdateAuditlogDto): Promise<AuditlogResponseDto> {
    const response = await api.put(`/auditlogs/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/auditlogs/${id}`);
  },
};
