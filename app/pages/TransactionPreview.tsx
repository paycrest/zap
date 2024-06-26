import Image from "next/image";
import { TbInfoSquareRounded } from "react-icons/tb";

import { TransactionPreviewProps } from "../types";
import {
  formatCurrency,
  formatNumberWithCommas,
  getInstitutionNameByCode,
} from "../utils";
import { primaryBtnClasses, secondaryBtnClasses } from "../components";

/**
 * Renders a preview of a transaction with the provided details.
 *
 * @param handleBackButtonClick - Function to handle the back button click event.
 * @param handlePaymentConfirmation - Function to handle the payment confirmation button click event.
 * @param stateProps - Object containing the form values, fee, rate, and supported institutions.
 */
export const TransactionPreview = ({
  handleBackButtonClick,
  handlePaymentConfirmation,
  stateProps: { formValues, fee, rate, institutions: supportedInstitutions },
}: TransactionPreviewProps) => {
  const {
    amount,
    token,
    currency,
    accountIdentifier,
    institution,
    recipientName,
    memo,
  } = formValues;

  // Rendered transaction information
  const renderedInfo = {
    amount: `${formatNumberWithCommas(amount)} ${token}`,
    fee: `${fee} ${token}`,
    totalValue: `${formatCurrency(Math.floor(amount * rate), currency, `en-${currency.slice(0, 2)}`)}`,
    recipient: recipientName,
    account: `${accountIdentifier} • ${getInstitutionNameByCode(institution, supportedInstitutions)}`,
    memo: memo,
  };

  return (
    <div className="grid gap-6 py-10 text-sm">
      <div className="grid gap-4">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-white/80">
          Review transaction
        </h2>
        <p className="text-gray-500 dark:text-white/50">
          Verify transaction details before you send
        </p>
      </div>

      <div className="grid gap-4">
        {/* Render transaction information */}
        {Object.entries(renderedInfo).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between gap-2">
            <h3 className="flex-1 text-gray-500 dark:text-white/50">
              {/* Capitalize the first letter of the key */}
              {key === "totalValue"
                ? "Total Value"
                : key.charAt(0).toUpperCase() + key.slice(1)}
            </h3>
            <p className="flex flex-1 items-center gap-1 font-medium text-neutral-900 dark:text-white/80">
              {/* Render token logo for amount and fee */}
              {(key === "amount" || key === "fee") && (
                <Image
                  src={`/${token.toLowerCase()}-logo.svg`}
                  alt={`${token} logo`}
                  width={14}
                  height={14}
                />
              )}
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Transaction detail disclaimer */}
      <div className="flex gap-2.5 rounded-xl border border-gray-200 bg-gray-50 p-3 text-gray-500 dark:border-white/10 dark:bg-white/5 dark:text-white/50">
        <TbInfoSquareRounded className="w-8 text-xl" />
        <p>
          Ensure the details above is correct. Failed transaction due to wrong
          details will attract a refund fee
        </p>
      </div>

      {/* CTAs */}
      <div className="flex gap-6">
        <button
          type="button"
          onClick={handleBackButtonClick}
          className={`w-fit ${secondaryBtnClasses}`}
        >
          Back
        </button>
        <button
          type="submit"
          onClick={handlePaymentConfirmation}
          className={`w-full ${primaryBtnClasses}`}
        >
          Confirm payment
        </button>
      </div>
    </div>
  );
};
