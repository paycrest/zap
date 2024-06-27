"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { FormData, InstitutionProps, StateProps } from "./types";
import {
  fetchSupportedInstitutions,
  fetchRate,
  fetchAggregatorPublicKey,
} from "./api/aggregator";
import {
  AnimatedPage,
  Preloader,
  TransactionForm,
  TransactionPreview,
} from "./components";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { erc20Abi, gatewayAbi } from "./api/abi";
import { getAddress, parseUnits } from "viem";
import { publicKeyEncrypt } from "./utils";
import TransactionStatus from "./pages/TransactionStatus";

const GATEWAY_CONTRACT_ADDRESS = "0x847dfdAa218F9137229CF8424378871A1DA8f625";

const INITIAL_FORM_STATE: FormData = {
  network: "",
  token: "",
  amount: 0,
  currency: "",
  institution: "",
  accountIdentifier: "",
  recipientName: "",
  memo: "",
};

/**
 * Represents the Home component.
 * This component handles the logic and rendering of the home page.
 */
export default function Home() {
  // State variables
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

  // Form methods and watch
  const formMethods = useForm<FormData>({ mode: "onChange" });
  const { watch } = formMethods;
  const { currency, amount, token } = watch();

  // Custom hooks for account and contract interactions
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

  // Transaction status and error handling
  const [transactionStatus, setTransactionStatus] = useState<
    "idle" | "pending" | "settled" | "failed"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>("");

  // Effect to update transaction status
  useEffect(() => {
    if (isPending) setTransactionStatus("pending");
  }, [isPending]);

  /**
   * Handles form submission.
   * @param data - The form data.
   */
  const onSubmit = (data: FormData) => {
    setFormValues(data);
  };

  /**
   * Handles network change.
   * @param network - The selected network.
   */
  const handleNetworkChange = (network: string) => {
    setSelectedNetwork(network);
  };

  /**
   * Handles tab change.
   * @param tab - The selected tab.
   */
  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  /**
   * Handles payment confirmation.
   * This function is called when the user confirms the payment.
   */
  const handlePaymentConfirmation = async () => {
    // Prepare recipient data
    const recipient = {
      accountIdentifier: formValues.accountIdentifier,
      accountName: "John Doe",
      institution: formValues.institution,
      providerId: "",
      memo: formValues.memo,
    };

    // Fetch aggregator public key
    const publicKey = await fetchAggregatorPublicKey();
    const encryptedRecipient = publicKeyEncrypt(recipient, publicKey.data);

    // Prepare transaction parameters
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
      setCreatedAt(new Date().toISOString());

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

      setTransactionStatus("settled");
    } catch (e) {
      console.log(error?.message);
      setErrorMessage(error?.message as string);
      setTransactionStatus("failed");
    }

    console.log("hash", hash);
  };

  // State props for child components
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

  // Fetch supported institutions based on currency
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

  // Fetch rate based on currency, amount, and token
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
      timeoutId = setTimeout(getRate, 1000);
    };

    debounceFetchRate();

    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, amount, token]);

  // Calculate fee based on protocol fee details and amount
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
  }, [protocolFeeDetails, amount, protocolFeePercent]);

  // Set page loading state to false after initial render
  useEffect(() => {
    setIsPageLoading(false);
  }, []);

  return (
    <>
      <Preloader isLoading={isPageLoading} />

      <AnimatePresence mode="wait">
        {transactionStatus !== "idle" ? (
          <AnimatedPage key="transaction-status">
            <TransactionStatus
              formMethods={formMethods}
              errorMessage={errorMessage}
              transactionStatus={transactionStatus}
              createdAt={createdAt}
              clearForm={() => setFormValues(INITIAL_FORM_STATE)}
              clearTransactionStatus={() => {
                setTransactionStatus("idle");
                setErrorMessage("");
              }}
            />
          </AnimatedPage>
        ) : (
          <>
            {Object.values(formValues).every(
              (value) => value === "" || value === 0,
            ) ? (
              <AnimatedPage key="transaction-form">
                <TransactionForm
                  onSubmit={onSubmit}
                  formMethods={formMethods}
                  stateProps={stateProps}
                />
              </AnimatedPage>
            ) : (
              <AnimatedPage key="transaction-preview">
                <TransactionPreview
                  handleBackButtonClick={() =>
                    setFormValues(INITIAL_FORM_STATE)
                  }
                  handlePaymentConfirmation={handlePaymentConfirmation}
                  stateProps={stateProps}
                />
              </AnimatedPage>
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
}
