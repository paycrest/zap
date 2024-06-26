"use client";
import Image from "next/image";
import { useTheme } from "next-themes";
import { PiCheckCircle, PiSpinnerBold, PiXCircle } from "react-icons/pi";

import { TransactionStatusProps } from "../types";
import { secondaryBtnClasses } from "../components";

/**
 * Renders the transaction status component.
 *
 * @param transactionStatus - The status of the transaction.
 * @param errorMessage - The error message, if any.
 * @param createdAt - The creation date of the transaction.
 * @param clearForm - Function to clear the form.
 * @param clearTransactionStatus - Function to clear the transaction status.
 * @param formMethods - The form methods.
 */
export default function TransactionStatus({
  transactionStatus,
  errorMessage,
  createdAt,
  clearForm,
  clearTransactionStatus,
  formMethods,
}: TransactionStatusProps) {
  const { resolvedTheme } = useTheme();

  const { watch } = formMethods;

  const token = watch("token"),
    recipientName = watch("recipientName"),
    amount = watch("amount");

  /**
   * Handles the back button click event.
   * Clears the transaction status if it's failed, otherwise clears the form and transaction status.
   */
  const handleBackButtonClick = () => {
    if (transactionStatus === "failed") {
      clearTransactionStatus();
    } else {
      clearForm();
      clearTransactionStatus();
    }
  };

  /**
   * Returns the image source based on the transaction status and theme.
   * @returns The image source.
   */
  const getImageSrc = () => {
    const base = transactionStatus === "pending" ? "/stepper" : "/stepper-long";
    const themeSuffix = resolvedTheme === "dark" ? "-dark.svg" : ".svg";
    return base + themeSuffix;
  };

  /**
   * Renders the status indicator based on the transaction status.
   * @returns The status indicator component.
   */
  const StatusIndicator = () =>
    transactionStatus === "settled" ? (
      <Image
        src="/checkmark.svg"
        alt="Checkmark"
        width={24}
        height={24}
        className="h-auto w-10"
      />
    ) : transactionStatus === "failed" ? (
      <PiXCircle className="text-4xl text-rose-500" />
    ) : (
      <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-1 dark:bg-white/10">
        <PiSpinnerBold className="animate-spin text-yellow-700 dark:text-yellow-400" />
        <p className="text-yellow-900 dark:text-yellow-400">
          {transactionStatus}
        </p>
      </div>
    );

  /**
   * Renders the payment details component if the transaction status is settled.
   * @returns The payment details component.
   */
  const PaymentDetails = () =>
    transactionStatus === "settled" && (
      <div className="flex w-full flex-col gap-4 text-neutral-900 dark:text-white/50">
        <div className="flex items-center justify-between gap-1">
          <p className="flex-1">Status</p>
          <div className="flex flex-1 items-center gap-1">
            <PiCheckCircle className="text-green-700 dark:text-green-500" />
            <p className="text-green-900 dark:text-green-500">Settled</p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-1">
          <p className="flex-1">Created</p>
          <p className="flex-1">{createdAt}</p>
        </div>
      </div>
    );

  /**
   * Formats the error message by extracting the relevant part.
   * @param message - The error message.
   * @returns The formatted error message.
   */
  const formatErrorMessage = (message: string) => {
    const formattedPart = message.match(
      /The contract function.*\s+- The address is not a contract\./s,
    );
    return formattedPart ? formattedPart[0] : message;
  };

  return (
    <div className="flex w-full items-center justify-between gap-10 text-sm">
      <div className="flex flex-col gap-2">
        <div className="flex w-fit flex-col items-end gap-2">
          {/* Token and Amount */}
          <div className="flex items-center gap-1 rounded-full bg-gray-50 px-2 py-1 dark:bg-white/5">
            <Image
              src={`${token}-logo.svg`}
              alt={`${token} logo`}
              width={14}
              height={14}
            />
            <p className="whitespace-nowrap pr-4 font-medium">
              {amount} {token}
            </p>
          </div>
          {/* Transaction Progress */}
          <Image
            src={getImageSrc()}
            alt="Progress"
            width={200}
            height={200}
            className="w-auto"
          />
          {/* Recipient Name */}
          <p className="whitespace-nowrap rounded-full bg-gray-50 px-2 py-1 dark:bg-white/5">
            {recipientName}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-start gap-4">
        {/* Status Indicator */}
        <StatusIndicator />

        {/* Transaction Status */}
        <h2 className="text-xl font-medium text-neutral-900 dark:text-white">
          {transactionStatus === "pending"
            ? "Processing payment..."
            : transactionStatus === "failed"
              ? "Payment failed"
              : "Payment completed"}
        </h2>

        {/* Pending Transaction Separator */}
        {transactionStatus === "pending" && (
          <hr className="w-full border-dashed border-gray-200 dark:border-white/10" />
        )}

        {/* Transaction Status Message */}
        <p className="leading-normal text-gray-500 dark:text-white/50">
          {transactionStatus === "pending"
            ? `Processing payment to ${recipientName}. Hang on, this will only take a few seconds.`
            : transactionStatus === "failed"
              ? `Your payment of ${amount} ${token} to ${recipientName} was unsuccessful. Please try again later or contact support for assistance.`
              : `Your payment of ${amount} ${token} to ${recipientName} has been completed successfully`}
        </p>

        {/* Back Button */}
        {transactionStatus !== "pending" && (
          <>
            <div className="flex w-full gap-3">
              <button
                onClick={handleBackButtonClick}
                type="button"
                className={`w-fit ${secondaryBtnClasses}`}
              >
                {transactionStatus === "failed" ? "Try again" : "Back to home"}
              </button>
            </div>

            {/* Error Separator */}
            {errorMessage && (
              <hr className="w-full border-dashed border-gray-200 dark:border-white/10" />
            )}
          </>
        )}

        {/* Error Details */}
        {errorMessage && (
          <div className="flex w-full flex-col gap-2 font-mono text-gray-500 dark:text-white/50">
            <h3 className="font-medium">Error details:</h3>
            <pre className="whitespace-pre-wrap text-xs">
              {formatErrorMessage(errorMessage)}
            </pre>
          </div>
        )}

        {/* Payment Details */}
        <PaymentDetails />
      </div>
    </div>
  );
}
