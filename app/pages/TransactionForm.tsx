"use client";
import { useAccount } from "wagmi";
import { AnimatePresence } from "framer-motion";

import {
  AnimatedComponent,
  InputError,
  primaryBtnClasses,
  slideInOut,
  FormDropdown,
  RecipientDetailsForm,
  NetworksDropdown,
} from "../components";
import type { TransactionFormProps } from "../types";
import { currencies, networks, tokens } from "../mocks";
import { NoteIcon, WalletIcon } from "../components/ImageAssets";
import { useState, useEffect } from "react";
import { BsArrowDown } from "react-icons/bs";
import { DevTool } from "@hookform/devtools";

/**
 * TransactionForm component renders a form for submitting a transaction.
 * It includes fields for selecting network, token, amount, and recipient details.
 * The form also displays rate and fee information based on the selected token.
 *
 * @param formMethods - Form methods from react-hook-form library.
 * @param onSubmit - Function to handle form submission.
 * @param stateProps - State properties for the form.
 */
export const TransactionForm = ({
  formMethods,
  onSubmit,
  stateProps,
}: TransactionFormProps) => {
  // Destructure stateProps
  const { tokenBalance, rate, isFetchingRate } = stateProps;

  // Destructure formMethods from react-hook-form
  const {
    handleSubmit,
    register,
    watch,
    control,
    setValue,
    formState: { errors, isValid, isDirty },
  } = formMethods;

  // Get values of currency, amount, and token from form
  const token = watch("token");
  const amountSent = watch("amountSent");
  const amountReceived = watch("amountReceived");

  // Get account information using custom hook
  const account = useAccount();

  // Array of objects for rendering rate and fee information
  const rateInfo = {
    key: "rate",
    label: "Rate",
    value: rate,
  };

  const feeInfo = {
    key: "eta",
    label: "Funds available in",
    value: "15s",
  };

  const renderedInfo = [rateInfo, feeInfo];

  const [isReceiveInputActive, setIsReceiveInputActive] = useState(false);

  const handleMaxClick = () => {
    setValue("amountSent", tokenBalance);
    setIsReceiveInputActive(false);
  };

  // Effect to calculate receive amount based on send amount and rate
  useEffect(() => {
    if (rate) {
      if (isReceiveInputActive) {
        setValue(
          "amountSent",
          Number((Number(amountReceived) / rate).toFixed(4)),
        );
      } else {
        setValue("amountReceived", Number((rate * amountSent).toFixed(4)));
      }
    }
  }, [amountSent, amountReceived, rate, isReceiveInputActive, setValue]);

  // set the default value of the currency and token
  useEffect(() => {
    register("currency", { value: currencies[0].name });
    register("token", { value: tokens[0].name });
    register("network", { value: networks[0].name });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="z-50 grid gap-6 py-10 text-sm text-neutral-900 transition-all dark:text-white"
        noValidate
      >
        <div className="space-y-2 rounded-2xl bg-gray-50 p-2 dark:bg-neutral-800">
          {/* Header */}
          <div className="flex items-center justify-between px-2">
            <h3 className="font-medium">Swap</h3>
            <NetworksDropdown
              selectedId="1"
              onSelect={(selectedNetwork) =>
                setValue("network", selectedNetwork)
              }
              iconOnly={true}
            />
          </div>

          {/* Amount to send & Token w/ wallet balance */}
          <div className="relative space-y-3.5 rounded-2xl bg-white px-4 py-3 dark:bg-neutral-900">
            <div className="flex items-center justify-between">
              <label
                htmlFor="amount-sent"
                className="text-gray-500 dark:text-white/80"
              >
                Send
              </label>
              <div className="flex items-center gap-2">
                <WalletIcon className="fill-gray-500 dark:fill-none" />
                <p>{Math.round(tokenBalance * 100) / 100}</p>
                <button
                  type="button"
                  onClick={handleMaxClick}
                  className="font-medium text-blue-600 dark:text-blue-500"
                >
                  Max
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <input
                id="amount-sent"
                type="number"
                step="0.0001"
                {...register("amountSent", {
                  required: { value: true, message: "Amount is required" },
                  disabled: !account.isConnected || token === "",
                  min: {
                    value: 0.5,
                    message: `Min. amount is 0.5`,
                  },
                  max: {
                    value: 500,
                    message: `Max. amount is 500`,
                  },
                  pattern: {
                    value: /^\d+(\.\d{1,4})?$/,
                    message: "Max. of 4 decimal places + no leading dot",
                  },
                  onChange: () => setIsReceiveInputActive(false),
                })}
                className="w-full rounded-xl border-b border-transparent bg-transparent py-2 text-2xl text-neutral-900 outline-none transition-all placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed dark:bg-neutral-900 dark:text-white/80 dark:placeholder:text-white/30"
                placeholder="0"
                title="Enter amount to send"
              />

              <FormDropdown
                defaultTitle="Select token"
                data={tokens}
                defaultSelectedId="2"
                onSelect={(selectedToken) => setValue("token", selectedToken)}
              />
            </div>
            {errors.amountSent && (
              <InputError message={errors.amountSent.message} />
            )}

            {/* Arrow showing swap direction */}
            <div className="absolute -bottom-5 left-1/2 z-10 w-fit -translate-x-1/2 rounded-xl border-4 border-gray-50 bg-gray-50 dark:border-neutral-800 dark:bg-neutral-800">
              <div className="rounded-lg bg-white p-1 dark:bg-neutral-900">
                <BsArrowDown className="text-xl text-gray-500 dark:text-white/80" />
              </div>
            </div>
          </div>

          {/* Amount to receive & currency */}
          <div className="space-y-3.5 rounded-2xl bg-white px-4 py-3 dark:bg-neutral-900">
            <label
              htmlFor="amount-received"
              className="text-gray-500 dark:text-white/80"
            >
              Receive
            </label>

            <div className="flex items-center justify-between gap-2">
              <input
                id="amount-received"
                type="number"
                step="0.0001"
                {...register("amountReceived", {
                  onChange: () => setIsReceiveInputActive(true),
                })}
                className="w-full rounded-xl border-b border-transparent bg-transparent py-2 text-2xl text-neutral-900 outline-none transition-all placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed dark:bg-neutral-900 dark:text-white/80 dark:placeholder:text-white/30"
                placeholder="0"
                title="Amount to receive"
              />

              <FormDropdown
                defaultTitle="Select currency"
                data={currencies}
                defaultSelectedId="2"
                onSelect={(selectedCurrency) =>
                  setValue("currency", selectedCurrency)
                }
              />
            </div>
            {errors.amountReceived && (
              <InputError message={errors.amountReceived.message} />
            )}
          </div>
        </div>

        {/* Recipient and memo */}
        <div className="space-y-2 rounded-2xl bg-gray-50 p-2 dark:bg-neutral-800">
          <RecipientDetailsForm
            formMethods={formMethods}
            stateProps={stateProps}
          />

          {/* Memo */}
          <div className="relative">
            <NoteIcon className="absolute left-2 top-2.5 fill-gray-200 stroke-gray-300 dark:fill-transparent dark:stroke-none" />
            <input
              type="text"
              id="memo"
              {...register("memo", {
                required: { value: true, message: "Add description" },
              })}
              className="w-full rounded-xl border border-gray-300 bg-transparent py-2 pl-8 pr-4 text-sm text-neutral-900 transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed dark:border-white/20 dark:bg-neutral-900 dark:text-white/80 dark:placeholder:text-white/30 dark:focus-visible:ring-offset-neutral-900"
              placeholder="Add description"
              maxLength={25}
            />
          </div>
          {errors.memo && <InputError message={errors.memo.message} />}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={!isValid || !isDirty || !account.isConnected}
          className={primaryBtnClasses}
        >
          {account.isConnected ? "Swap" : "Connect wallet to continue"}
        </button>

        {/* Rate and fee */}
        <AnimatePresence>
          {rate > 0 && Number(amountSent) > 0.5 && account.isConnected && (
            <AnimatedComponent
              variant={slideInOut}
              className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 transition-all dark:border-white/10 dark:bg-white/5"
            >
              {renderedInfo.map(({ key, label, value }, index) => (
                <AnimatedComponent
                  key={key}
                  delay={index * 0.1}
                  className={`flex items-center justify-between border-dashed border-white/10 px-4 py-3 font-normal text-gray-500 transition-all dark:text-white/50 ${index === 1 ? "border-t" : ""}`}
                >
                  <p>{label}</p>
                  <p
                    className={`rounded-full px-2 py-1 transition-all ${
                      isFetchingRate
                        ? "animate-pulse bg-gradient-to-r from-white to-gray-100 dark:from-neutral-800 dark:to-neutral-900"
                        : "bg-white dark:bg-neutral-900"
                    }`}
                  >
                    <span className={`${isFetchingRate ? "blur-xl" : ""}`}>
                      {value}
                    </span>
                  </p>
                </AnimatedComponent>
              ))}
            </AnimatedComponent>
          )}
        </AnimatePresence>
      </form>
      {/* <DevTool control={control} /> */}
    </>
  );
};
