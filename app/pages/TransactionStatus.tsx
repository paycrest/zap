"use client";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { PiCheckCircle, PiSpinnerBold } from "react-icons/pi";

import { calculateDuration } from "../utils";
import type { TransactionStatusProps } from "../types";
import {
  AnimatedComponent,
  scaleInOut,
  secondaryBtnClasses,
  fadeInOut,
  slideInOut,
} from "../components";
import { useAccount } from "wagmi";
import { fetchOrderStatus } from "../api/aggregator";
import { RiRefund2Line } from "react-icons/ri";

/**
 * Renders the transaction status component.
 *
 * @param transactionStatus - The status of the transaction.
 * @param recipientName - The name of the recipient.
 * @param errorMessage - The error message, if any.
 * @param createdAt - The creation date of the transaction.
 * @param clearForm - Function to clear the form.
 * @param clearTransactionStatus - Function to clear the transaction status.
 * @param formMethods - The form methods.
 */
export default function TransactionStatus({
  transactionStatus,
  recipientName,
  orderId,
  createdAt,
  clearForm,
  clearTransactionStatus,
  setTransactionStatus,
  formMethods,
}: TransactionStatusProps) {
  const { resolvedTheme } = useTheme();
  const account = useAccount();
  const [completedAt, setCompletedAt] = useState<string>("");
  const [createdHash, setCreatedHash] = useState<string>("");

  const { watch } = formMethods;

  const token = watch("token");
  const amount = watch("amount");

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (!orderId || ["validated", "settled"].includes(transactionStatus))
      return;

    const getOrderStatus = async () => {
      try {
        const orderStatus = await fetchOrderStatus(orderId);

        if (orderStatus.data.status !== "pending") {
          if (["validated", "settled"].includes(transactionStatus)) {
            // If order is completed, we can stop polling
            clearInterval(intervalId);
          }

          setTransactionStatus(
            orderStatus.data.status as
              | "processing"
              | "fulfilled"
              | "validated"
              | "settled"
              | "refunded",
          );

          setCompletedAt(orderStatus.data.updatedAt);

          if (orderStatus.data.status === "processing") {
            const createdReceipt = orderStatus.data.txReceipts.find(
              (txReceipt) => txReceipt.status === "pending",
            );
            setCreatedHash(createdReceipt?.txHash!);
          }
        }
      } catch (error) {
        console.error("Error fetching order status:", error);
      }
    };

    // Initial call
    getOrderStatus();

    // Set up polling
    intervalId = setInterval(getOrderStatus, 2000);

    // Cleanup function
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [orderId, transactionStatus]);

  /**
   * Handles the back button click event.
   * Clears the transaction status if it's refunded, otherwise clears the form and transaction status.
   */
  const handleBackButtonClick = () => {
    if (transactionStatus === "refunded") {
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
    const base = !["validated", "settled", "refunded"].includes(
      transactionStatus,
    )
      ? "/stepper"
      : "/stepper-long";
    const themeSuffix = resolvedTheme === "dark" ? "-dark.svg" : ".svg";
    return base + themeSuffix;
  };

  /**
   * Renders the status indicator based on the transaction status.
   * @returns The status indicator component.
   */
  const StatusIndicator = () => (
    <AnimatePresence mode="wait">
      {["validated", "settled"].includes(transactionStatus) ? (
        <AnimatedComponent variant={scaleInOut} key="settled">
          <Image
            src="/checkmark.svg"
            alt="Checkmark"
            width={24}
            height={24}
            className="h-auto w-10"
          />
        </AnimatedComponent>
      ) : transactionStatus === "refunded" ? (
        <AnimatedComponent
          variant={{
            ...scaleInOut,
            animate: { scale: 1, rotate: 0 },
            initial: { scale: 0, rotate: -90 },
            exit: { scale: 0, rotate: 90 },
          }}
          key="refunded"
        >
          <RiRefund2Line className="text-4xl text-rose-500" />
        </AnimatedComponent>
      ) : (
        <AnimatedComponent
          variant={fadeInOut}
          key="pending"
          className={`flex items-center gap-1 rounded-full px-2 py-1 dark:bg-white/10 ${
            transactionStatus === "pending"
              ? "bg-orange-50 text-orange-400"
              : transactionStatus === "processing"
                ? "bg-yellow-50 text-yellow-400"
                : transactionStatus === "fulfilled"
                  ? "bg-sky-50 text-sky-500"
                  : "bg-gray-50"
          }`}
        >
          <PiSpinnerBold className="animate-spin" />
          <p>{transactionStatus}</p>
        </AnimatedComponent>
      )}
    </AnimatePresence>
  );

  return (
    <AnimatedComponent
      variant={slideInOut}
      className="flex w-full items-center justify-between gap-10 text-sm"
    >
      <div className="flex flex-col gap-2">
        <div className="flex w-fit flex-col items-end gap-2">
          {/* Token and Amount */}
          <AnimatedComponent
            variant={slideInOut}
            delay={0.2}
            className="flex items-center gap-1 rounded-full bg-gray-50 px-2 py-1 dark:bg-white/5"
          >
            <Image
              src={`/${String(token)?.toLowerCase()}-logo.svg`}
              alt={`${token} logo`}
              width={14}
              height={14}
            />
            <p className="whitespace-nowrap pr-4 font-medium">
              {amount} {token}
            </p>
          </AnimatedComponent>
          {/* Transaction Progress */}
          <Image
            src={getImageSrc()}
            alt="Progress"
            width={200}
            height={200}
            className="w-auto"
          />
          {/* Recipient Name */}
          <AnimatedComponent
            variant={slideInOut}
            delay={0.4}
            className="whitespace-nowrap rounded-full bg-gray-50 px-2 py-1 capitalize dark:bg-white/5"
          >
            {recipientName.toLocaleLowerCase().split(" ")[0]}
          </AnimatedComponent>
        </div>
      </div>

      <div className="flex flex-col items-start gap-4">
        {/* Status Indicator Icon */}
        <StatusIndicator />

        {/* Transaction Status */}
        <AnimatedComponent
          variant={slideInOut}
          delay={0.2}
          className="text-xl font-medium text-neutral-900 dark:text-white"
        >
          {transactionStatus === "refunded"
            ? "Payment refunded"
            : !["validated", "settled"].includes(transactionStatus)
              ? "Processing payment..."
              : "Payment completed"}
        </AnimatedComponent>

        {/* Pending Transaction Separator */}
        {!["validated", "settled"].includes(transactionStatus) && (
          <hr className="w-full border-dashed border-gray-200 dark:border-white/10" />
        )}

        {/* Transaction Status Message */}
        <AnimatedComponent
          variant={slideInOut}
          delay={0.4}
          className="leading-normal text-gray-500 dark:text-white/50"
        >
          {transactionStatus === "refunded"
            ? `Your payment of ${amount} ${token} to ${recipientName} was unsuccessful and your crypto has been refunded. Please try again.`
            : !["validated", "settled"].includes(transactionStatus)
              ? `Processing payment to ${recipientName}. Hang on, this will only take a few seconds.`
              : `Your payment of ${amount} ${token} to ${recipientName} has been completed successfully`}
        </AnimatedComponent>

        {/* Back Button */}
        <AnimatePresence>
          {["validated", "settled", "refunded"].includes(transactionStatus) && (
            <>
              <AnimatedComponent
                variant={slideInOut}
                delay={0.5}
                className="flex w-full gap-3"
              >
                <button
                  onClick={handleBackButtonClick}
                  type="button"
                  className={`w-fit ${secondaryBtnClasses}`}
                >
                  {transactionStatus === "refunded"
                    ? "Try again"
                    : "Back to home"}
                </button>
              </AnimatedComponent>
            </>
          )}
        </AnimatePresence>

        {/* Payment Details */}
        <AnimatePresence>
          {["validated", "settled"].includes(transactionStatus) && (
            <AnimatedComponent
              variant={{
                ...fadeInOut,
                animate: { opacity: 1, height: "auto" },
                initial: { opacity: 0, height: 0 },
                exit: { opacity: 0, height: 0 },
              }}
              delay={0.7}
              className="flex w-full flex-col gap-4 text-neutral-900 dark:text-white/50"
            >
              <div className="flex items-center justify-between gap-1">
                <p className="flex-1">Status</p>
                <div className="flex flex-1 items-center gap-1">
                  <PiCheckCircle className="text-green-700 dark:text-green-500" />
                  <p className="text-green-900 dark:text-green-500">
                    Completed
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-1">
                <p className="flex-1">Time spent</p>
                <p className="flex-1">
                  {calculateDuration(createdAt, completedAt)}
                </p>
              </div>
              <div className="flex items-center justify-between gap-1">
                <p className="flex-1">Receipt</p>
                <p className="flex-1">
                  <a
                    href={`${account.chain?.blockExplorers?.default.url}/tx/${createdHash}`}
                    className="text-blue-600 hover:underline dark:text-blue-500"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View in explorer
                  </a>
                </p>
              </div>
            </AnimatedComponent>
          )}
        </AnimatePresence>
      </div>
    </AnimatedComponent>
  );
}
