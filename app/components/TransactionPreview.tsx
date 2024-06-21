import { TbInfoSquareRounded } from "react-icons/tb";

import { TransactionPreviewProps } from "../types";
import { getInstitutionNameByCode } from "../utils";

const TransactionPreviewDetail = ({
  title,
  details,
}: {
  title: string;
  details: string;
}) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <h3 className="flex-1 dark:text-white/50">{title}</h3>
      <p className="flex-1 dark:text-white/80">{details}</p>
    </div>
  );
};

export const TransactionPreview = ({
  formValues,
  setFormValues,
  supportedInstitutions,
}: TransactionPreviewProps) => {
  const handleBackButtonClick = () => {
    setFormValues({
      network: "",
      token: "",
      amount: 0,
      currency: "",
      recipientBank: "",
      recipientAccount: "",
      memo: "",
    });
  };

  return (
    <div className="grid gap-6 py-10 text-sm">
      <div className="grid gap-4">
        <h2 className="text-xl font-medium dark:text-white/80">
          Review transaction
        </h2>
        <p className="dark:text-white/50">
          Verify transaction details before you send
        </p>
      </div>

      <div className="grid gap-4">
        <TransactionPreviewDetail
          title="Amount"
          details={`${formValues.amount} USDC`}
        />
        <TransactionPreviewDetail title="Fees" details={"..."} />
        <TransactionPreviewDetail title="Total Value" details={"..."} />
        <TransactionPreviewDetail
          title="Currency"
          details={formValues.currency}
        />
        <TransactionPreviewDetail title="Recipient" details={"..."} />
        <TransactionPreviewDetail
          title="Account"
          details={`${formValues.recipientAccount} • ${getInstitutionNameByCode(formValues.recipientBank, supportedInstitutions)}`}
        />
        <TransactionPreviewDetail title="Memo" details={formValues.memo} />
      </div>

      <div className="flex gap-2.5 rounded-xl border p-3 dark:border-white/10 dark:bg-white/5 dark:text-white/50">
        <TbInfoSquareRounded className="w-8 text-xl" />
        <p>
          Ensure the details above is correct. Failed transaction due to wrong
          details will attract a refund fee
        </p>
      </div>

      <div className="flex gap-6">
        <button
          type="button"
          onClick={handleBackButtonClick}
          className="w-fit rounded-xl border border-gray-300 bg-transparent px-4 py-2.5 font-medium text-neutral-900 transition-all hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-95 dark:border-white/20 dark:text-white dark:hover:bg-white/10 dark:focus-visible:ring-offset-neutral-900"
        >
          Back
        </button>
        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 px-4 py-2.5 font-medium text-white transition-all hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-95 dark:focus-visible:ring-offset-neutral-900"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
};
