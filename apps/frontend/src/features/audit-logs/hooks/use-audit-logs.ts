import type { CreateAuditlogDto, UpdateAuditlogDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { auditlogsService } from '../services';

const AUDITLOG_KEY = ['auditlogs'];

export function useAuditlogs() {
  return useQuery({
    queryKey: AUDITLOG_KEY,
    queryFn: () => auditlogsService.getAll(),
  });
}

export function useAuditlog(id: string) {
  return useQuery({
    queryKey: [...AUDITLOG_KEY, id],
    queryFn: () => auditlogsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateAuditlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAuditlogDto) => auditlogsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUDITLOG_KEY });
    },
  });
}

export function useUpdateAuditlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAuditlogDto }) =>
      auditlogsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUDITLOG_KEY });
    },
  });
}

export function useDeleteAuditlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => auditlogsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUDITLOG_KEY });
    },
  });
}
