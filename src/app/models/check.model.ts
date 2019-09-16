export interface Check {
  id: string;
  description: string;
  amount: number;

  checkbook: DocumentSummary;
  project: DocumentSummary;
  employee: DocumentSummary;
}

interface DocumentSummary {
  id: string;
  name: string;
}
