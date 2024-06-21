export interface FormData {
  network: string;
  token: string;
  amount: number;
  currency: string;
  recipientBank: string;
  recipientAccount: string;
  memo: string;
}

export interface InstitutionProps {
  name: string;
  code: string;
  type: string;
}

export interface TransactionFormProps {
  handleSubmit: any;
  register: any;
  watch: any;
  errors: any;
  onSubmit: any;
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  selectedNetwork: string;
  setSelectedNetwork: (network: string) => void;
  supportedInstitutions: Array<{ name: string; code: string; type: string }>;
  institutionsLoading: boolean;
}

export interface TransactionPreviewProps {
  formValues: FormData;
  setFormValues: (data: FormData) => void;
  supportedInstitutions: InstitutionProps[];
}
