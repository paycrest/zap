import { FaRegHourglass } from "react-icons/fa6";
import { TransactionDetails } from "./TransactionDetails";
import { InputError } from "./InputError";
import { inputClasses } from "../page";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { supportedInstitutions } from "../mocks/supportedInstitutions";
import { TabButton } from "./TabButton";
import { PiCaretDown } from "react-icons/pi";
import { NetworkButton } from "./NetworkButton";
import { renderSelectField } from "./SelectField";

const tokens = [
  { value: "USDC", label: "USDC" },
  { value: "USDT", label: "USDT" },
];

const currencies = [
  { value: "NGN", label: "Nigerian naira (NGN)" },
  { value: "KES", label: "Kenyan shilling (KES)", disabled: true },
  { value: "GHS", label: "Ghanaian Cedi (GHS)", disabled: true },
];

export const TransactionForm = ({
  handleSubmit,
  register,
  watch,
  errors,
  onSubmit,
  isValid,
  isDirty,
  isSubmitting,
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
        <input type="hidden" {...register("network")} value={selectedNetwork} />

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
        {renderSelectField(
          "token",
          "Token",
          tokens,
          {
            required: { value: true, message: "Token is required" },
          },
          errors,
          register,
        )}

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
              {renderSelectField(
                "currency",
                "Currency",
                currencies,
                {
                  required: { value: true, message: "Select currency" },
                },
                errors,
                register,
              )}

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
                errors,
                register,
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
