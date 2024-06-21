"use client";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { TransactionForm, TransactionPreview } from "./components";
import { FormData, InstitutionProps } from "./types";

export const inputClasses =
  "w-full rounded-xl border border-gray-300 bg-transparent bg-white py-2 px-4 text-sm text-neutral-900 transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/20 dark:bg-neutral-900 dark:text-white/80 dark:placeholder:text-white/30 dark:focus-visible:ring-offset-neutral-900 disabled:cursor-not-allowed";

const API_URL = "https://staging-api.paycrest.io/v1/institutions";

export default function Home() {
  const [pageIsLoading, setPageIsLoading] = useState(true);
  const [selectedNetwork, setSelectedNetwork] = useState("base");
  const [selectedTab, setSelectedTab] = useState("bank-transfer");

  const [isInstitutionsLoading, setInstitutionsLoading] = useState(false);
  const [supportedInstitutions, setSupportedInstitutions] = useState<
    InstitutionProps[]
  >([]);
  const [formValues, setFormValues] = useState<FormData>({
    network: "",
    token: "",
    amount: 0,
    currency: "",
    recipientBank: "",
    recipientAccount: "",
    memo: "",
  });

  const formMethods = useForm<FormData>({ mode: "onChange" });
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = formMethods;

  const onSubmit = (data: FormData) => {
    setFormValues(data);
  };

  useEffect(() => {
    const fetchSupportedInstitutions = async () => {
      if (!watch("currency")) return;

      try {
        setInstitutionsLoading(true);

        const response = await axios.get(`${API_URL}/${watch("currency")}`);
        const institutions = response.data.data;
        setSupportedInstitutions(institutions);
      } catch (error) {
        console.error(error);
      }
      setInstitutionsLoading(false);
    };

    fetchSupportedInstitutions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("currency")]);

  useEffect(() => {
    setPageIsLoading(false);
  }, []);

  if (pageIsLoading) {
    return (
      <div className="fixed inset-0 z-50 grid min-h-screen place-items-center gap-4 bg-white dark:bg-neutral-900">
        <div className="loader"></div>
      </div>
    );
  }

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
          supportedInstitutions={supportedInstitutions}
          institutionsLoading={isInstitutionsLoading}
        />
      ) : (
        <TransactionPreview
          formValues={formValues}
          setFormValues={setFormValues}
          supportedInstitutions={supportedInstitutions}
        />
      )}
    </>
  );
}
