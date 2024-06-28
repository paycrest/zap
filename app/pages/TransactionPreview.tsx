"use client";
import Image from "next/image";
import { TbInfoSquareRounded } from "react-icons/tb";

import { TransactionPreviewProps } from "../types";
import {
  formatCurrency,
  formatNumberWithCommas,
  getInstitutionNameByCode,
  publicKeyEncrypt,
} from "../utils";
import { primaryBtnClasses, secondaryBtnClasses } from "../components";
import {
  useAccount,
  useWriteContract,
  useWatchContractEvent,
  useReadContract,
} from "wagmi";
import { fetchAggregatorPublicKey } from "../api/aggregator";
import {
  BaseError,
  decodeEventLog,
  formatUnits,
  getAddress,
  parseUnits,
} from "viem";
import { erc20Abi, gatewayAbi } from "../api/abi";
import { useEffect, useState } from "react";

const GATEWAY_CONTRACT_ADDRESS = "0x847dfdaa218f9137229cf8424378871a1da8f625";
const TOKEN_CONTRACT_ADDRESS = "0x7683022d84f726a96c4a6611cd31dbf5409c0ac9";

/**
 * Renders a preview of a transaction with the provided details.
 *
 * @param handleBackButtonClick - Function to handle the back button click event.
 * @param handlePaymentConfirmation - Function to handle the payment confirmation button click event.
 * @param stateProps - Object containing the form values, fee, rate, and supported institutions.
 */
export const TransactionPreview = ({
  handleBackButtonClick,
  stateProps: {
    formValues,
    fee,
    rate,
    institutions: supportedInstitutions,
    setCreatedAt,
    setTransactionStatus,
  },
}: TransactionPreviewProps) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const {
    data: hash,
    error,
    isPending,
    writeContractAsync,
  } = useWriteContract();

  // Update token balance when token balance is available
  useEffect(() => {
    if (isPending) {
      setIsConfirming(true);
    }

    if (errorMessage) {
      setIsConfirming(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending, errorMessage]);

  const {
    amount,
    token,
    currency,
    accountIdentifier,
    institution,
    recipientName,
    memo,
  } = formValues;

  // Rendered transaction information
  const renderedInfo = {
    amount: `${formatNumberWithCommas(amount)} ${token}`,
    fee: `${fee} ${token}`,
    totalValue: `${formatCurrency(Math.floor(amount * rate), currency, `en-${currency.slice(0, 2)}`)}`,
    recipient: recipientName,
    account: `${accountIdentifier} • ${getInstitutionNameByCode(institution, supportedInstitutions)}`,
    memo: memo,
  };

  const account = useAccount();

  // Get allowance given to gateway contract
  const { data: tokenAllowanceInWei } = useReadContract({
    abi: erc20Abi,
    address: TOKEN_CONTRACT_ADDRESS,
    functionName: "allowance",
    args: [account.address!, GATEWAY_CONTRACT_ADDRESS],
  });

  // State for token allowance
  const [tokenAllowance, setTokenAllowance] = useState<number>(0);

  // Update token balance when token balance is available
  useEffect(() => {
    if (tokenAllowanceInWei) {
      setTokenAllowance(Number(formatUnits(tokenAllowanceInWei, 18)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenAllowanceInWei]);

  // Watch for token Approval event
  useWatchContractEvent({
    address: TOKEN_CONTRACT_ADDRESS,
    abi: erc20Abi,
    args: {
      owner: account.address,
      spender: getAddress(GATEWAY_CONTRACT_ADDRESS),
    },
    eventName: "Approval",
    async onLogs(logs: any) {
      console.log("New approval logs!", logs);
      await createOrder();
    },
  });

  // Watch for OrderCreated event
  useWatchContractEvent({
    address: GATEWAY_CONTRACT_ADDRESS,
    abi: gatewayAbi,
    eventName: "OrderCreated",
    args: {
      sender: account.address,
      token: getAddress(TOKEN_CONTRACT_ADDRESS),
    },
    onLogs(logs: any) {
      const decodedLog = decodeEventLog({
        abi: gatewayAbi,
        eventName: "OrderCreated",
        data: logs[0].data,
        topics: logs[0].topics,
      });
      console.log("orderId", decodedLog.args.orderId);
      setIsConfirming(false);
      setTransactionStatus("pending");
    },
  });

  const createOrder = async () => {
    try {
      // Prepare recipient data
      const recipient = {
        accountIdentifier: formValues.accountIdentifier,
        accountName: "Chibuotu Amadi",
        institution: formValues.institution,
        providerId: "RKVeHPBP",
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

      setCreatedAt(new Date().toISOString());

      // // Create order
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
    } catch (e: any) {
      if (error) {
        setErrorMessage((error as BaseError).shortMessage || error!.message);
      } else {
        setErrorMessage((e as BaseError).shortMessage);
      }
    }
  };

  const handlePaymentConfirmation = async () => {
    try {
      if (tokenAllowance < amount) {
        // Approve gateway contract to spend token
        await writeContractAsync({
          address: TOKEN_CONTRACT_ADDRESS,
          abi: erc20Abi,
          functionName: "approve",
          args: [GATEWAY_CONTRACT_ADDRESS, parseUnits(amount.toString(), 18)],
        });
      } else {
        createOrder();
      }
    } catch (e: any) {
      if (error) {
        setErrorMessage((error as BaseError).shortMessage || error!.message);
      } else {
        setErrorMessage((e as BaseError).shortMessage);
      }
    }
  };

  return (
    <div className="grid gap-6 py-10 text-sm">
      <div className="grid gap-4">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-white/80">
          Review transaction
        </h2>
        <p className="text-gray-500 dark:text-white/50">
          Verify transaction details before you send
        </p>
      </div>

      <div className="grid gap-4">
        {/* Render transaction information */}
        {Object.entries(renderedInfo).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between gap-2">
            <h3 className="flex-1 text-gray-500 dark:text-white/50">
              {/* Capitalize the first letter of the key */}
              {key === "totalValue"
                ? "Total Value"
                : key.charAt(0).toUpperCase() + key.slice(1)}
            </h3>
            <p className="flex flex-1 items-center gap-1 font-medium text-neutral-900 dark:text-white/80">
              {/* Render token logo for amount and fee */}
              {(key === "amount" || key === "fee") && (
                <Image
                  src={`/${token.toLowerCase()}-logo.svg`}
                  alt={`${token} logo`}
                  width={14}
                  height={14}
                />
              )}
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Transaction detail disclaimer */}
      <div className="flex gap-2.5 rounded-xl border border-gray-200 bg-gray-50 p-3 text-gray-500 dark:border-white/10 dark:bg-white/5 dark:text-white/50">
        <TbInfoSquareRounded className="w-8 text-xl" />
        <p>
          Ensure the details above is correct. Failed transaction due to wrong
          details will attract a refund fee
        </p>
      </div>

      {/* CTAs */}
      <div className="flex gap-6">
        <button
          type="button"
          onClick={handleBackButtonClick}
          className={`w-fit ${secondaryBtnClasses}`}
        >
          Back
        </button>
        <button
          type="submit"
          onClick={handlePaymentConfirmation}
          className={`w-full ${primaryBtnClasses}`}
          disabled={isConfirming}
        >
          {isConfirming ? "Confirming..." : "Confirm payment"}
        </button>
      </div>

      <div>
        {errorMessage && <p>{errorMessage}</p>}
        {hash && <p>{hash}</p>}
      </div>
    </div>
  );
};
