"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PiCheckCircle, PiSpinnerBold } from "react-icons/pi";
import { primaryBtnClasses, secondaryBtnClasses } from "../components";
import { useTheme } from "next-themes";

export default function Page() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  let token = "DAI",
    amount = 2.48,
    recipientName = "John Doe";

  const [status, setStatus] = useState("pending");

  // ! this is for testing purposes only
  useEffect(() => {
    setTimeout(() => {
      setStatus("settled");
    }, 3000);
  }, []);

  return (
    <div className="flex w-full items-center justify-between gap-2 text-sm">
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex w-fit flex-col items-end gap-2">
          <div className="flex items-center gap-1 rounded-full bg-gray-50 px-2 py-1 dark:bg-white/5">
            <Image
              src={`${token}-logo.svg`}
              alt={`${token} logo`}
              width={14}
              height={14}
            />
            <p className="font-medium">
              {amount} {token}
            </p>
          </div>
          <Image
            src={
              status !== "settled"
                ? resolvedTheme === "dark"
                  ? "/stepper-dark.svg"
                  : "/stepper.svg"
                : resolvedTheme === "dark"
                  ? "/stepper-long-dark.svg"
                  : "/stepper-long.svg"
            }
            alt="Arrow right"
            width={200}
            height={200}
            className="w-auto"
          />
          <p className="rounded-full bg-gray-50 px-2 py-1 dark:bg-white/5">
            {recipientName}
          </p>
        </div>
      </div>

      <div className="flex flex-[2] flex-col items-start gap-4">
        {status === "pending" ? (
          <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-1">
            <PiSpinnerBold className="animate-spin text-yellow-700" />
            <p className="text-yellow-900">{status}</p>
          </div>
        ) : (
          <Image
            src="/checkmark.svg"
            alt="Checkmark"
            width={24}
            height={24}
            className="h-auto w-10"
          />
        )}

        <h2 className="text-xl font-medium text-neutral-900 dark:text-white">
          {status === "pending" ? "Processing payment..." : "Payment completed"}
        </h2>

        {status !== "settled" && (
          <hr className="w-full border-dashed border-gray-200 dark:border-white/10" />
        )}

        <p className="leading-normal text-gray-500 dark:text-white/50">
          {status === "pending"
            ? `Processing payment to ${recipientName}. Hang on, this will only take a few seconds.`
            : `Your payment of ${amount} ${token} to ${recipientName} has been completed successfully`}
        </p>

        {status === "settled" && (
          <div className="flex w-full gap-3">
            <button
              onClick={() => router.push("/")}
              type="button"
              className={`w-fit ${secondaryBtnClasses}`}
            >
              Done
            </button>
            <button
              onClick={() => router.push("/")}
              type="submit"
              className={`w-full ${primaryBtnClasses}`}
            >
              New payment
            </button>
          </div>
        )}

        {status === "settled" && (
          <hr className="w-full border-dashed border-gray-200 dark:border-white/10" />
        )}

        {status === "settled" && (
          <div className="flex w-full flex-col gap-4 text-neutral-900 dark:text-white/50">
            <div className="flex items-center justify-between gap-4">
              <p className="flex-1">Status</p>
              <div className="flex flex-1 items-center gap-1">
                <PiCheckCircle className="text-green-700" />
                <p className="text-green-900">Settled</p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="flex-1">Created</p>
              <p className="flex-1">tx. time</p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="flex-1">Settled</p>
              <p className="flex-1">tx. time</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
