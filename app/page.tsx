"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { PiCaretDown } from "react-icons/pi";
import { FaRegHourglass } from "react-icons/fa";
import { AiOutlineQuestionCircle } from "react-icons/ai";

import { InputError, NetworkButton, TabButton } from "./components";
import {
  getInstitutionNameByCode,
  supportedInstitutions,
} from "./mocks/supportedInstitutions";
import { TbInfoSquare, TbInfoSquareRounded } from "react-icons/tb";

interface FormData {
  network: string;
  token: string;
  amount: number;
  currency: string;
  recipientBank: string;
  recipientAccount: string;
  memo: string;
}

interface TransactionDetailsProps {
  title: string;
  details: string | number;
  border?: boolean;
}

const tokens = [
  { value: "USDC", label: "USDC" },
  { value: "USDT", label: "USDT" },
];

const currencies = [
  { value: "NGN", label: "Nigerian naira (NGN)" },
  { value: "KES", label: "Kenyan shilling (KES)", disabled: true },
  { value: "GHS", label: "Ghanaian Cedi (GHS)", disabled: true },
];

const inputClasses =
  "w-full rounded-xl border border-gray-300 bg-transparent bg-white py-2 px-4 text-sm text-neutral-900 transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/20 dark:bg-neutral-900 dark:text-white/80 dark:placeholder:text-white/30 dark:focus-visible:ring-offset-neutral-900 disabled:cursor-not-allowed";

const TransactionDetails = ({
  title,
  details,
  border = true,
}: TransactionDetailsProps) => {
  return (
    <div
      className={`flex items-center justify-between border-dashed border-white/10 px-4 py-3 font-normal text-gray-500 dark:text-white/50 ${
        border ? "border-b" : ""
      }`}
    >
      <p>{title}</p>
      <p className="rounded-full bg-white px-2 py-1 dark:bg-neutral-900">
        {details}
      </p>
    </div>
  );
};

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, isDirty, isValid, errors },
  } = useForm<FormData>({
    mode: "onChange",
  });

  const [selectedNetwork, setSelectedNetwork] = useState("base");
  const [selectedTab, setSelectedTab] = useState("bank-transfer");

  const [formValues, setFormValues] = useState<FormData>({
    network: "",
    token: "",
    amount: 0,
    currency: "",
    recipientBank: "",
    recipientAccount: "",
    memo: "",
  });

  const onSubmit = (data: FormData) => {
    // alert(JSON.stringify(data, null, 2));
    setFormValues(data);
  };

  const renderSelectField = (
    id: string,
    label: string,
    options: { value: string; label: string; disabled?: boolean }[],
    validation: any,
  ) => (
    <div className="grid flex-1 gap-2">
      <label htmlFor={id} className="font-medium">
        {label} <span className="text-rose-500">*</span>
      </label>
      <div className="relative">
        <select
          {...register(id as keyof FormData, validation)}
          id={id}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-neutral-900 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed dark:border-white/20 dark:bg-neutral-900 dark:text-white/80 dark:focus-visible:ring-offset-neutral-900"
        >
          <option value="" hidden>
            Select {label.toLowerCase()}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className="disabled:cursor-not-allowed disabled:opacity-50"
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-4 flex items-center">
          <PiCaretDown className="text-lg text-gray-400 dark:text-white/50" />
        </div>
      </div>
      {errors[id as keyof FormData] && (
        <InputError message={errors[id as keyof FormData]?.message} />
      )}
    </div>
  );

  return (
    <>
      {Object.values(formValues).every(
        (value) => value === "" || value === 0,
      ) ? (
        <TransactionForm
          handleSubmit={handleSubmit}
          register={register}
          watch={watch}
          errors={errors}
          onSubmit={onSubmit}
          isValid={isValid}
          isDirty={isDirty}
          isSubmitting={isSubmitting}
          renderSelectField={renderSelectField}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          selectedNetwork={selectedNetwork}
          setSelectedNetwork={setSelectedNetwork}
        />
      ) : (
        <TransactionPreview {...formValues} />
      )}
    </>
  );
}

const TransactionForm = ({
  handleSubmit,
  register,
  watch,
  errors,
  onSubmit,
  isValid,
  isDirty,
  isSubmitting,
  renderSelectField,
  selectedTab,
  setSelectedTab,
  selectedNetwork,
  setSelectedNetwork,
}: any) => {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-6 py-10 text-sm text-neutral-900 transition-all dark:text-white"
      noValidate
    >
      {/* Networks */}
      <div className="flex items-center gap-3 font-medium">
        <input
          type="hidden"
          {...register("network")}
          value={selectedNetwork}
          defaultValue={selectedNetwork}
        />

        <NetworkButton
          network="base"
          logo="/base-logo.svg"
          alt="Base logo"
          selectedNetwork={selectedNetwork}
          setSelectedNetwork={setSelectedNetwork}
        />
        <NetworkButton
          network="arbitrum"
          logo="/arbitrum-logo.svg"
          alt="Arbitrum logo"
          selectedNetwork={selectedNetwork}
          setSelectedNetwork={setSelectedNetwork}
          disabled
        />
        <NetworkButton
          network="polygon"
          logo="/polygon-matic-logo.svg"
          alt="Polygon logo"
          selectedNetwork={selectedNetwork}
          setSelectedNetwork={setSelectedNetwork}
          disabled
        />
        {/* Other network buttons */}
        <button
          type="button"
          disabled
          aria-label="Other networks"
          className="flex cursor-not-allowed items-center justify-center gap-2 rounded-full border border-gray-300 p-2.5 opacity-70 dark:border-white/20"
        >
          <PiCaretDown className="cursor-pointer text-lg text-gray-400 dark:text-white/50" />
        </button>
      </div>

      <div className="flex items-start gap-4">
        {/* Token */}
        {renderSelectField("token", "Token", tokens, {
          required: { value: true, message: "Token is required" },
        })}

        {/* Amount */}
        <div className="grid flex-1 gap-2">
          <label htmlFor="amount" className="font-medium">
            Amount <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              id="amount"
              type="number"
              step="0.01"
              {...register("amount", {
                required: { value: true, message: "Amount is required" },
                disabled: watch("token") === "",
                min: {
                  value: 0.01,
                  message: "Minimum amount is 0.01",
                },
                max: {
                  value: 1000000,
                  message: "Max. amount is 1,000,000",
                },
              })}
              className={`${inputClasses} pl-4 pr-14`}
              placeholder="0.00"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              {watch("token")}
            </div>
          </div>
          {errors.amount && <InputError message={errors.amount.message} />}
        </div>
      </div>

      <div>
        <h3 className="pb-2 font-medium">
          Recipient details <span className="text-rose-500">*</span>
        </h3>

        <div className="grid gap-4 rounded-3xl border border-gray-200 p-4 transition-all dark:border-white/10">
          {/* Tabs */}
          <div className="flex items-center gap-2 rounded-full bg-gray-50 p-1 font-medium dark:bg-white/5">
            <TabButton
              tab="bank-transfer"
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
            <TabButton
              tab="mobile-money"
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </div>

          {/* Bank Transfer Tab Contents */}
          {selectedTab === "bank-transfer" && (
            <div className="grid gap-4">
              {/* Currency */}
              {renderSelectField("currency", "Currency", currencies, {
                required: { value: true, message: "Select currency" },
              })}

              {/* Recipient Bank */}
              {renderSelectField(
                "recipientBank",
                "Recipient Bank",
                Object.keys(supportedInstitutions[watch("currency")] || {}).map(
                  (institutionCode) => ({
                    value: institutionCode,
                    label:
                      supportedInstitutions[watch("currency")][institutionCode],
                  }),
                ),
                {
                  required: { value: true, message: "Select recipient bank" },
                  disabled: watch("currency") === "",
                },
              )}

              {/* Recipient Account */}
              <div className="grid gap-2">
                <label htmlFor="recipient-account" className="font-medium">
                  Recipient Account <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="recipient-account"
                    {...register("recipientAccount", {
                      required: {
                        value: true,
                        message: "Enter recipient account",
                      },
                      pattern: {
                        value: /\d{10}/,
                        message: "Invalid account number",
                      },
                    })}
                    className={inputClasses}
                    placeholder="12345678901"
                    maxLength={10}
                    pattern="\d{10}"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 dark:text-white/20">
                    {10 - (watch("recipientAccount")?.length ?? 0)}
                  </div>
                </div>
                {errors.recipientAccount && (
                  <InputError message={errors.recipientAccount.message} />
                )}
                {!errors.recipientAccount && (
                  <div className="flex items-center gap-1 text-gray-400 dark:text-white/50">
                    <AiOutlineQuestionCircle />
                    <p>Usually 10 digits.</p>
                  </div>
                )}
              </div>

              {/* Memo */}
              <div className="grid gap-2">
                <label htmlFor="memo" className="font-medium">
                  Memo <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="memo"
                    {...register("memo", {
                      required: { value: true, message: "Enter memo" },
                    })}
                    className={inputClasses}
                    placeholder="Enter memo"
                    maxLength={20}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 dark:text-white/20">
                    {20 - (watch("memo")?.length ?? 0)}
                  </div>
                </div>
                {errors.memo && <InputError message={errors.memo.message} />}
              </div>
            </div>
          )}

          {/* Mobile Money Tab Contents */}
          {selectedTab === "mobile-money" && (
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 py-5 dark:border-white/10">
              <FaRegHourglass className="text-yellow-700 dark:text-yellow-400" />
              <p className="text-gray-500">Coming soon</p>
            </div>
          )}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!isValid || !isDirty || isSubmitting}
        className="w-full rounded-xl bg-blue-600 px-4 py-2.5 font-medium text-white transition-all hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-white dark:focus-visible:ring-offset-neutral-900 dark:disabled:bg-zinc-800 dark:disabled:text-white/50"
      >
        {isSubmitting ? "Submitting..." : "Connect Wallet to Continue"}
      </button>

      {/* Rate, Fee and Amount calculations */}
      <div className="flex flex-col rounded-2xl border border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/5">
        <TransactionDetails title="Rate" details="1 USDC = 1 NGN" />
        <TransactionDetails title="Fee (0.12%)" details="0.00 NGN" />
        <TransactionDetails
          title="Recipient receives"
          details="0.00 NGN"
          border={false}
        />
      </div>
    </form>
  );
};

const TransactionDetail = ({ title, details }: TransactionDetailsProps) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <h3 className="flex-1 dark:text-white/50">{title}</h3>
      <p className="flex-1 dark:text-white/80">{details}</p>
    </div>
  );
};

const TransactionPreview = (formValues: FormData) => {
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
        <TransactionDetail
          title="Amount"
          details={`${formValues.amount} USDC`}
        />
        <TransactionDetail title="Fees" details={"..."} />
        <TransactionDetail title="Total Value" details={"..."} />
        <TransactionDetail title="Currency" details={formValues.currency} />
        <TransactionDetail title="Recipient" details={"..."} />
        <TransactionDetail
          title="Account"
          details={`${formValues.recipientAccount} • ${getInstitutionNameByCode(formValues.recipientBank)}`}
        />
        <TransactionDetail title="Memo" details={formValues.memo} />
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
