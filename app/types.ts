import {
  FieldErrors,
  UseFormRegister,
  UseFormHandleSubmit,
  UseFormSetValue,
} from "react-hook-form";

export type InstitutionProps = {
  name: string;
  code: string;
  type: string;
};

export type FormData = {
  network: string;
  token: string;
  amount: number;
  currency: string;
  institution: string;
  accountIdentifier: string;
  recipientName: string;
  memo: string;
};

export type FormMethods = {
  handleSubmit: UseFormHandleSubmit<FormData, undefined>;
  register: UseFormRegister<FormData>;
  watch: (name: string) => string | number | undefined;
  formState: {
    errors: FieldErrors<FormData>;
    isValid: boolean;
    isDirty: boolean;
    isSubmitting: boolean;
  };
};

export type TransactionFormProps = {
  onSubmit: any;
  formMethods: FormMethods;
  stateProps: StateProps;
};

export type TransactionPreviewProps = {
  handleBackButtonClick: () => void;
  handlePaymentConfirmation: () => void;
  stateProps: StateProps;
};

export type TransactionStatusProps = {
  transactionStatus: "idle" | "pending" | "settled" | "failed";
  errorMessage: string;
  createdAt: string;
  clearForm: () => void;
  clearTransactionStatus: () => void;
  formMethods: FormMethods;
};

export type SelectFieldProps = {
  id: string;
  label: string;
  options: { value: string; label: string; disabled?: boolean }[];
  validation: any;
  errors: any;
  register: any;
  isLoading?: boolean;
  value?: string | number | undefined;
  defaultValue?: string;
};

export type RatePayload = {
  token: string;
  amount?: number;
  currency: string;
};

export type RateResponse = {
  status: string;
  data: number;
  message: string;
};

export type PubkeyResponse = {
  status: string;
  data: string;
  message: string;
};

export type StateProps = {
  formValues: FormData;
  fee: number;
  rate: number;
  isFetchingRate: boolean;
  institutions: InstitutionProps[];
  isFetchingInstitutions: boolean;
  selectedTab: string;
  handleTabChange: (tab: string) => void;
  selectedNetwork: string;
  handleNetworkChange: (network: string) => void;
};

export type NetworkButtonProps = {
  network: string;
  logo: string;
  alt: string;
  selectedNetwork: string;
  handleNetworkChange: (network: string) => void;
  disabled?: boolean;
};

export type TabButtonProps = {
  tab: string;
  selectedTab: string;
  handleTabChange: (tab: string) => void;
};
