export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'textarea' | 'select' | 'checkbox';
  required: boolean;
  placeholder?: string;
  options?: string[];
}

export interface FormSubmission {
  id: string;
  formId: string;
  data: Record<string, any>;
  submittedAt: string;
  status: 'new' | 'reviewed' | 'spam';
}

export interface FormConfig {
  id: string;
  name: string;
  slug: string;
  fields: FormField[];
  isActive: boolean;
  notifyEmail?: string;
  submissionsCount: number;
}
