"use client";
import { formatUnits } from "viem";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useSmartAccount } from "@biconomy/use-aa";
import { useAccount, useReadContract, useSwitchChain } from "wagmi";

import {
  AnimatedPage,
  Disclaimer,
  Preloader,
  TransactionForm,
  TransactionPreview,
} from "./components";
import {
  fetchRate,
  fetchAccountName,
  fetchSupportedInstitutions,
} from "./api/aggregator";
import { erc20Abi } from "./api/abi";
import { fetchSupportedTokens } from "./utils";
import TransactionStatus from "./pages/TransactionStatus";
import type { FormData, InstitutionProps, StateProps } from "./types";

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
  const [isFetchingRecipientName, setIsFetchingRecipientName] = useState(false);

  const [rate, setRate] = useState<number>(0);
  const [recipientName, setRecipientName] = useState<string>("");
  const [formValues, setFormValues] = useState<FormData>(INITIAL_FORM_STATE);
  const [institutions, setInstitutions] = useState<InstitutionProps[]>([]);

  const [selectedNetwork, setSelectedNetwork] = useState<string>("base");
  const [selectedTab, setSelectedTab] = useState<string>("bank-transfer");

  // Form methods and watch
  const formMethods = useForm<FormData>({ mode: "onChange" });
  const { watch } = formMethods;
  const { currency, amount, token, accountIdentifier, institution } = watch();

  // Get account information using custom hook
  const account = useAccount();
  const { smartAccountAddress } = useSmartAccount();

  // State for tokens
  const [smartTokenBalance, setSmartTokenBalance] = useState<number>(0);
  const [tokenBalance, setTokenBalance] = useState<number>(0);

  // Get token balances using custom hook and Ethereum contract interaction
  const { data: smartTokenBalanceInWei } = useReadContract({
    abi: erc20Abi,
    address: fetchSupportedTokens(account.chain?.name)?.find(
      (t) => t.symbol.toUpperCase() === token,
    )?.address as `0x${string}`,
    functionName: "balanceOf",
    args: [smartAccountAddress!],
  });

  const { data: tokenBalanceInWei } = useReadContract({
    abi: erc20Abi,
    address: fetchSupportedTokens(account.chain?.name)?.find(
      (t) => t.symbol.toUpperCase() === token,
    )?.address as `0x${string}`,
    functionName: "balanceOf",
    args: [account.address!],
  });

  // Transaction status and error handling
  const [transactionStatus, setTransactionStatus] = useState<
    | "idle"
    | "pending"
    | "processing"
    | "fulfilled"
    | "validated"
    | "settled"
    | "refunded"
  >("idle");
  const [createdAt, setCreatedAt] = useState<string>("");
  const [orderId, setOrderId] = useState<string>("");

  const { switchChain } = useSwitchChain();

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

  // State props for child components
  const stateProps: StateProps = {
    formValues,
    tokenBalance,
    smartTokenBalance,
    rate,
    isFetchingRate,
    recipientName,
    isFetchingRecipientName,
    institutions,
    isFetchingInstitutions,
    selectedTab,
    handleTabChange,
    selectedNetwork,
    setCreatedAt,
    setOrderId,
    handleNetworkChange,
    setTransactionStatus,
  };

  // Fetch supported institutions based on currency
  useEffect(() => {
    const getInstitutions = async () => {
      if (!currency) return;

      setIsFetchingInstitutions(true);

      try {
        const institutions = await fetchSupportedInstitutions(currency);
        setInstitutions(institutions);
        setIsFetchingInstitutions(false);
      } catch (error) {
        console.log(error);
      }
    };

    getInstitutions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  // Fetch recipient name based on institution and account identifier
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const getRecipientName = async () => {
      if (!accountIdentifier || !institution) return;

      setIsFetchingRecipientName(true);

      try {
        const accountName = await fetchAccountName({
          institution,
          accountIdentifier,
        });
        setRecipientName(accountName);
        setIsFetchingRecipientName(false);
      } catch (error) {
        setRecipientName("");
        setIsFetchingRecipientName(false);
      }
    };

    const debounceFetchRecipientName = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(getRecipientName, 1000);
    };

    debounceFetchRecipientName();

    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountIdentifier, institution]);

  // Reset transaction status and form values when account status changes
  useEffect(() => {
    if (account.status !== "connected" && account.status !== "connecting") {
      setTransactionStatus("idle");
      setFormValues(INITIAL_FORM_STATE);
    }

    if (account.status === "connected" && account.chainId) {
      if (
        process.env.NEXT_PUBLIC_ENVIRONMENT === "testnet" &&
        account.chainId === 8453
      ) {
        switchChain({ chainId: 84532 });
        toast.error("Kindly switch to Base Sepolia to continue.");
      } else if (
        process.env.NEXT_PUBLIC_ENVIRONMENT === "mainnet" &&
        account.chainId === 84532
      ) {
        switchChain({ chainId: 8453 });
        toast.error("Kindly switch to Base Mainnet to continue.");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account.status, account.chainId]);

  // Fetch rate based on currency, amount, and token
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const getRate = async () => {
      if (!currency || !amount || !token) return;
      setIsFetchingRate(true);
      try {
        const rate = await fetchRate({
          token: "USDT",
          amount: amount,
          currency: currency,
        });
        setRate(rate.data);
        setIsFetchingRate(false);
      } catch (error) {
        console.log(error);
      }
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

  const tokenDecimals = fetchSupportedTokens(account.chain?.name)?.find(
    (t) => t.symbol.toUpperCase() === token,
  )?.decimals;

  // Update token balance when token balance is available
  useEffect(() => {
    if (tokenBalanceInWei && tokenDecimals) {
      setTokenBalance(Number(formatUnits(tokenBalanceInWei, tokenDecimals)));
    }

    if (smartTokenBalanceInWei && tokenDecimals) {
      setSmartTokenBalance(
        Number(formatUnits(smartTokenBalanceInWei, tokenDecimals)),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenBalanceInWei, smartTokenBalanceInWei]);

  // Set page loading state to false after initial render
  useEffect(() => {
    setIsPageLoading(false);
  }, []);

  return (
    <>
      <Preloader isLoading={isPageLoading} />

      <Disclaimer />

      <AnimatePresence mode="wait">
        {transactionStatus !== "idle" ? (
          <AnimatedPage componentKey="transaction-status">
            <TransactionStatus
              formMethods={formMethods}
              transactionStatus={transactionStatus}
              createdAt={createdAt}
              orderId={orderId}
              recipientName={stateProps.recipientName}
              clearForm={() => setFormValues(INITIAL_FORM_STATE)}
              clearTransactionStatus={() => {
                setTransactionStatus("idle");
              }}
              setTransactionStatus={setTransactionStatus}
            />
          </AnimatedPage>
        ) : (
          <>
            {Object.values(formValues).every(
              (value) => value === "" || value === 0,
            ) ? (
              <AnimatedPage componentKey="transaction-form">
                <TransactionForm
                  onSubmit={(data: FormData) => setFormValues(data)}
                  formMethods={formMethods}
                  stateProps={stateProps}
                />
              </AnimatedPage>
            ) : (
              <AnimatedPage componentKey="transaction-preview">
                <TransactionPreview
                  handleBackButtonClick={() =>
                    setFormValues(INITIAL_FORM_STATE)
                  }
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
