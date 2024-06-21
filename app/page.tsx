"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { PiCaretDown } from "react-icons/pi";
import { FaRegHourglass } from "react-icons/fa";
import { AiOutlineQuestionCircle } from "react-icons/ai";

import {
  InputError,
  NetworkButton,
  TabButton,
  TransactionDetails,
  TransactionForm,
  TransactionPreview,
} from "./components";
import {
  getInstitutionNameByCode,
  supportedInstitutions,
} from "./mocks/supportedInstitutions";
import { TbInfoSquareRounded } from "react-icons/tb";

export interface FormData {
  network: string;
  token: string;
  amount: number;
  currency: string;
  recipientBank: string;
  recipientAccount: string;
  memo: string;
}

export const inputClasses =
  "w-full rounded-xl border border-gray-300 bg-transparent bg-white py-2 px-4 text-sm text-neutral-900 transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/20 dark:bg-neutral-900 dark:text-white/80 dark:placeholder:text-white/30 dark:focus-visible:ring-offset-neutral-900 disabled:cursor-not-allowed";

export default function Home() {
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

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, isDirty, isValid, errors },
  } = useForm<FormData>({
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    setFormValues(data);
  };

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
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          selectedNetwork={selectedNetwork}
          setSelectedNetwork={setSelectedNetwork}
        />
      ) : (
        <TransactionPreview
          formValues={formValues}
          setFormValues={setFormValues}
        />
      )}
    </>
  );
}
