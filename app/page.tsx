"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { FormData, InstitutionProps, StateProps } from "./types";
import {
  fetchSupportedInstitutions,
  fetchRate,
  fetchAggregatorPublicKey,
} from "./api/aggregator";
import { Preloader, TransactionForm, TransactionPreview } from "./components";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { erc20Abi, gatewayAbi } from "./api/abi";
import { getAddress, parseUnits } from "viem";
import { publicKeyEncrypt } from "./utils";

const GATEWAY_CONTRACT_ADDRESS = "0x847dfdAa218F9137229CF8424378871A1DA8f625";

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

  const account = useAccount();

  const { data: protocolFeeDetails } = useReadContract({
    abi: gatewayAbi,
    address: GATEWAY_CONTRACT_ADDRESS,
    functionName: "getFeeDetails",
  });

  const {
    data: hash,
    error,
    isPending,
    writeContractAsync,
  } = useWriteContract();

  const onSubmit = (data: FormData) => {
    setFormValues(data);
  };

  const handleNetworkChange = (network: string) => {
    setSelectedNetwork(network);
  };

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const handlePaymentConfirmation = async () => {
    const recipient = {
      accountIdentifier: formValues.accountIdentifier,
      accountName: "John Doe",
      institution: formValues.institution,
      providerId: "",
      memo: formValues.memo,
    };

    // fetch aggregator public key
    const publicKey = await fetchAggregatorPublicKey();
    const encryptedRecipient = publicKeyEncrypt(recipient, publicKey.data);

    const params = {
      token: getAddress("0x7683022d84F726a96c4A6611cD31DBf5409c0Ac9"),
      amount: parseUnits(amount.toString(), 18),
      rate: parseUnits(rate.toString(), 0),
      senderFeeRecipient: getAddress(
        "0x0000000000000000000000000000000000000000",
      ),
      senderFee: BigInt(0),
      refundAddress: account.address,
      messageHash: encryptedRecipient,
    };

    try {
      // Approve gateway contract to spend token
      await writeContractAsync({
        abi: erc20Abi,
        address: "0x7683022d84F726a96c4A6611cD31DBf5409c0Ac9",
        functionName: "approve",
        args: [GATEWAY_CONTRACT_ADDRESS, params.amount],
      });

      // Create order
      await writeContractAsync({
        abi: gatewayAbi,
        address: GATEWAY_CONTRACT_ADDRESS,
        functionName: "createOrder",
        args: [
          params.token,
          params.amount,
          params.rate,
          params.senderFeeRecipient,
          params.senderFee,
          params.refundAddress!,
          params.messageHash,
        ],
      });
    } catch (e) {
      console.log(error?.message);
    }

    console.log("hash", hash);
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
