import type { CreateDocumentDto, UpdateDocumentDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { documentsService } from '../services';

const DOCUMENT_KEY = ['documents'];

export function useDocuments() {
  return useQuery({
    queryKey: DOCUMENT_KEY,
    queryFn: () => documentsService.getAll(),
  });
}

export function useDocument(id: string) {
  return useQuery({
    queryKey: [...DOCUMENT_KEY, id],
    queryFn: () => documentsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDocumentDto) => documentsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DOCUMENT_KEY });
    },
  });
}

export function useUpdateDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDocumentDto }) =>
      documentsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DOCUMENT_KEY });
    },
  });
}

export function useDeleteDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => documentsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DOCUMENT_KEY });
    },
  });
}
