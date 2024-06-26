"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { FormData, InstitutionProps, StateProps } from "./types";
import { fetchSupportedInstitutions, fetchRate } from "./api/aggregator";
import { Preloader, TransactionForm, TransactionPreview } from "./components";
import { useReadContract } from "wagmi";
import { gatewayAbi } from "./api/abi";

const INITIAL_FORM_STATE: FormData = {
  network: "",
  token: "",
  amount: 0,
  currency: "",
  institution: "",
  accountIdentifier: "",
  memo: "",
};

export default function Home() {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isFetchingInstitutions, setIsFetchingInstitutions] = useState(false);
  const [isFetchingRate, setIsFetchingRate] = useState(false);

  const { data: protocolFeeDetails } = useReadContract({
    abi: gatewayAbi,
    address: "0x847dfdAa218F9137229CF8424378871A1DA8f625",
    functionName: "getFeeDetails",
  });

  const [protocolFeePercent, setProtocolFeePercent] = useState<number>(0);
  const [fee, setFee] = useState<number>(0);
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

  const handlePaymentConfirmation = () => {
    console.log("hello world");
  };

  const stateProps: StateProps = {
    formValues,
    fee,
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
    setProtocolFeePercent(
      Number(protocolFeeDetails?.[0]!) / Number(protocolFeeDetails?.[1]!),
    );

    setFee(
      parseFloat(
        Number(protocolFeePercent * Number(amount))
          .toFixed(5)
          .toString(),
      ),
    );
  });

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
          handlePaymentConfirmation={handlePaymentConfirmation}
          stateProps={stateProps}
        />
      )}
    </>
  );
}
