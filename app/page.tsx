"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { FormData, InstitutionProps } from "./types";
import { Preloader, TransactionForm, TransactionPreview } from "./components";
import { fetchSupportedInstitutions } from "./api/institutions";
import { fetchRates } from "./api/rates";

const INITIAL_FORM_STATE: FormData = {
  network: "",
  token: "",
  amount: 0,
  currency: "",
  recipientBank: "",
  recipientAccount: "",
  memo: "",
};

export default function Home() {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isFetchingInstitutions, setIsFetchingInstitutions] = useState(false);
  const [isFetchingRates, setIsFetchingRates] = useState(false);

  const [rates, setRates] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<FormData>(INITIAL_FORM_STATE);
  const [institutions, setInstitutions] = useState<InstitutionProps[]>([]);

  const formMethods = useForm<FormData>({ mode: "onChange" });
  const { watch } = formMethods;
  const { currency, amount, token } = watch();

  const onSubmit = (data: FormData) => {
    setFormValues(data);
  };

  useEffect(() => {
    const getInstitutions = async () => {
      if (!currency) return;

      setIsFetchingInstitutions(true);

      const institutions = await fetchSupportedInstitutions(currency);
      setInstitutions(institutions);

      setIsFetchingInstitutions(false);
    };

    getInstitutions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  useEffect(() => {
    const getRates = async () => {
      if (!currency || !amount || !token) return;

      setIsFetchingRates(true);

      const rates = await fetchRates({ token, amount, currency });
      setRates(rates.data);

      setIsFetchingRates(false);
    };

    getRates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, amount, token]);

  useEffect(() => {
    setIsPageLoading(false);
  }, []);

  if (isPageLoading) return <Preloader />;

  return (
    <>
      {Object.values(formValues).every(
        (value) => value === "" || value === 0,
      ) ? (
        <TransactionForm
          rates={rates}
          onSubmit={onSubmit}
          formMethods={formMethods}
          institutionsLoading={isFetchingInstitutions}
          supportedInstitutions={institutions}
        />
      ) : (
        <TransactionPreview
          formValues={formValues}
          supportedInstitutions={institutions}
          handleBackButtonClick={() => setFormValues(INITIAL_FORM_STATE)}
        />
      )}
    </>
  );
}
