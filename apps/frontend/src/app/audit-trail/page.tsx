'use client';

import { useAuditLogs } from '@/features/audit-logs/hooks/use-audit-logs';

export default function AuditTrailPage() {
  const { data: auditLogs, isLoading } = useAuditLogs();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Audit Trail</h1>
      <p className="text-muted-foreground mb-6">View audit logs and changes made to documents.</p>
      
      <div className="grid gap-4">
        {auditLogs?.map((auditLog: any) => (
          <div key={auditLog.id} className="border rounded p-4">
            <pre>{JSON.stringify(auditLog, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
