"use client";
import { useState, useEffect } from "react";
import { BsArrowDown } from "react-icons/bs";
import { usePrivy } from "@privy-io/react-auth";
import { AnimatePresence } from "framer-motion";

import {
  AnimatedComponent,
  InputError,
  primaryBtnClasses,
  slideInOut,
  FormDropdown,
  RecipientDetailsForm,
  VerifyIDModal,
} from "../components";
import type { TransactionFormProps } from "../types";
import { currencies, networks, tokens } from "../mocks";
import { NoteIcon, WalletIcon } from "../components/ImageAssets";

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
  const { tokenBalance, rate, isFetchingRate, defaultCurrency } = stateProps;

  // Destructure formMethods from react-hook-form
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors, isValid, isDirty },
  } = formMethods;

  const { user, authenticated, ready, login } = usePrivy();

  // Get values of currency, amount, and token from form
  const { amountSent, amountReceived, token, currency } = watch();

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

  // set the default value of the token and network
  useEffect(() => {
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
          <h3 className="px-2 font-medium">Swap</h3>

          {/* Amount to send & Token w/ wallet balance */}
          <div className="relative space-y-3.5 rounded-2xl bg-white px-4 py-3 dark:bg-neutral-900">
            <div className="flex items-center justify-between">
              <label
                htmlFor="amount-sent"
                className="text-gray-500 dark:text-white/80"
              >
                Send
              </label>
              {authenticated && token && (
                <div className="flex items-center gap-2">
                  <WalletIcon className="fill-gray-500 dark:fill-none" />
                  <p>{Math.round(tokenBalance * 100) / 100}</p>
                  <button
                    type="button"
                    onClick={handleMaxClick}
                    className="font-medium text-primary dark:text-primary"
                  >
                    Max
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-2">
              <input
                id="amount-sent"
                type="number"
                step="0.0001"
                {...register("amountSent", {
                  required: { value: true, message: "Amount is required" },
                  disabled: !authenticated || token === "",
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
            {/* {errors.amountSent && (
              <InputError message={errors.amountSent.message} />
            )} */}

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
                  disabled: !authenticated || token === "",
                  onChange: () => setIsReceiveInputActive(true),
                })}
                className="w-full rounded-xl border-b border-transparent bg-transparent py-2 text-2xl text-neutral-900 outline-none transition-all placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed dark:bg-neutral-900 dark:text-white/80 dark:placeholder:text-white/30"
                placeholder="0"
                title="Enter amount to receive"
              />

              <FormDropdown
                defaultTitle="Select currency"
                data={currencies}
                defaultSelectedId={
                  currencies.find((currency) => currency.name === "KES")?.id ||
                  "1"
                }
                onSelect={(selectedCurrency) =>
                  setValue("currency", selectedCurrency)
                }
              />
            </div>
            {/* {errors.amountReceived && (
              <InputError message={errors.amountReceived.message} />
            )} */}
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
              className="w-full rounded-xl border border-gray-300 bg-transparent py-2 pl-8 pr-4 text-sm text-neutral-900 transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed dark:border-white/20 dark:bg-neutral-900 dark:text-white/80 dark:placeholder:text-white/30 dark:focus-visible:ring-offset-neutral-900"
              placeholder="Add description"
              maxLength={25}
            />
          </div>
          {/* {errors.memo && <InputError message={errors.memo.message} />} */}
        </div>

        {/* Submit button */}
        {ready && authenticated ? (
          <VerifyIDModal />
        ) : (
          <button type="button" className={primaryBtnClasses} onClick={login}>
            Connect
          </button>
        )}

        <AnimatePresence>
          {rate > 0 && Number(amountSent) > 0.5 && authenticated && (
            <AnimatedComponent
              variant={slideInOut}
              className="flex w-full flex-col justify-between gap-2 text-xs text-gray-500 transition-all dark:text-white/30 sm:flex-row sm:items-center"
            >
              <div className="min-w-fit">
                1 {token} ~ {rate} {currency}
              </div>
              <div className="ml-auto flex w-full flex-col justify-end gap-2 sm:flex-row sm:items-center">
                <div className="h-px w-1/2 flex-shrink bg-gradient-to-tr from-white to-gray-300 dark:bg-gradient-to-tr dark:from-neutral-900 dark:to-neutral-700 sm:w-full" />
                <p className="min-w-fit">
                  Swap usually completes in 15s or less
                </p>
              </div>
            </AnimatedComponent>
          )}
        </AnimatePresence>
      </form>
    </>
  );
};
