import { api } from '@/lib/api';
import type { DocumentResponseDto, CreateDocumentDto, UpdateDocumentDto } from '@saas-template/core';

export const documentsService = {
  async getAll(): Promise<DocumentResponseDto[]> {
    const response = await api.get('/documents');
    return response.data;
  },

  async getById(id: string): Promise<DocumentResponseDto> {
    const response = await api.get(`/documents/${id}`);
    return response.data;
  },

  async create(data: CreateDocumentDto): Promise<DocumentResponseDto> {
    const response = await api.post('/documents', data);
    return response.data;
  },

  async update(id: string, data: UpdateDocumentDto): Promise<DocumentResponseDto> {
    const response = await api.put(`/documents/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/documents/${id}`);
  },
};
