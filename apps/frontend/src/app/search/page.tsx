'use client';

import { useDocuments } from '@/features/documents/hooks/use-documents';

export default function SearchPage() {
  const { data: documents, isLoading } = useDocuments();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Search</h1>
      <p className="text-muted-foreground mb-6">Search functionality to find documents and data.</p>
      
      <div className="grid gap-4">
        {documents?.map((document: any) => (
          <div key={document.id} className="border rounded p-4">
            <pre>{JSON.stringify(document, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
