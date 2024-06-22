"use client";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { FormData, InstitutionProps } from "./types";
import { Preloader, TransactionForm, TransactionPreview } from "./components";

const API_URL = "https://staging-api.paycrest.io/v1/institutions";

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
  const [pageIsLoading, setPageIsLoading] = useState(true);

  const [isInstitutionsLoading, setInstitutionsLoading] = useState(false);
  const [supportedInstitutions, setSupportedInstitutions] = useState<
    InstitutionProps[]
  >([]);
  const [formValues, setFormValues] = useState<FormData>(INITIAL_FORM_STATE);

  const formMethods = useForm<FormData>({ mode: "onChange" });
  const { watch } = formMethods;

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

  if (pageIsLoading) return <Preloader />;

  return (
    <>
      {Object.values(formValues).every(
        (value) => value === "" || value === 0,
      ) ? (
        <TransactionForm
          onSubmit={onSubmit}
          formMethods={formMethods}
          institutionsLoading={isInstitutionsLoading}
          supportedInstitutions={supportedInstitutions}
        />
      ) : (
        <TransactionPreview
          formValues={formValues}
          supportedInstitutions={supportedInstitutions}
          handleBackButtonClick={() => setFormValues(INITIAL_FORM_STATE)}
        />
      )}
    </>
  );
}
