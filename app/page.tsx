"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { fetchRate } from "./api/rate";
import { FormData, InstitutionProps, StateProps } from "./types";
import { fetchSupportedInstitutions } from "./api/institutions";
import { Preloader, TransactionForm, TransactionPreview } from "./components";

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
  const [isFetchingRate, setIsFetchingRate] = useState(false);

  const [rate, setRate] = useState<number>(0);
  const [formValues, setFormValues] = useState<FormData>(INITIAL_FORM_STATE);
  const [institutions, setInstitutions] = useState<InstitutionProps[]>([]);

  const [selectedNetwork, setSelectedNetwork] = useState<string>("base");
  const [selectedTab, setSelectedTab] = useState<string>("bank-transfer");

  const formMethods = useForm<FormData>({ mode: "onChange" });
  const { watch } = formMethods;
  const { currency, amount, token } = watch();

  const onSubmit = (data: FormData) => {
    setFormValues(data);
  };

  const handleNetworkChange = (network: string) => {
    setSelectedNetwork(network);
  };

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const stateProps: StateProps = {
    formValues,
    rate,
    isFetchingRate,
    institutions,
    isFetchingInstitutions,
    selectedTab,
    handleTabChange,
    selectedNetwork,
    handleNetworkChange,
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
    let timeoutId: NodeJS.Timeout;

    const getRate = async () => {
      if (!currency || !amount || !token) return;

      setIsFetchingRate(true);

      const rate = await fetchRate({
        token: "USDT",
        amount: amount,
        currency: currency,
      });
      setRate(rate.data);

      setIsFetchingRate(false);
    };

    const debounceFetchRate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(getRate, 2000);
    };

    debounceFetchRate();

    return () => {
      clearTimeout(timeoutId);
    };
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
          onSubmit={onSubmit}
          formMethods={formMethods}
          stateProps={stateProps}
        />
      ) : (
        <TransactionPreview
          handleBackButtonClick={() => setFormValues(INITIAL_FORM_STATE)}
          stateProps={stateProps}
        />
      )}
    </>
  );
}
