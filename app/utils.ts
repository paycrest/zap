import JSEncrypt from "jsencrypt";
import { InstitutionProps, Token } from "./types";

/**
 * Retrieves the institution name based on the provided institution code.
 *
 * @param code - The institution code.
 * @returns The institution name associated with the provided code, or undefined if not found.
 */
export function getInstitutionNameByCode(
  code: string,
  supportedInstitutions: InstitutionProps[],
): string | undefined {
  const institution = supportedInstitutions.find((inst) => inst.code === code);
  return institution ? institution.name : undefined;
}

/**
 * Formats a number with commas.
 *
 * @param num - The number to format.
 * @returns The formatted number as a string.
 */
export function formatNumberWithCommas(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Formats a number as a currency string.
 *
 * @param value - The number to format.
 * @param currency - The currency code to use.
 * @param locale - The locale to use.
 * @returns The formatted currency string.
 */
export const formatCurrency = (
  value: number,
  currency: string = "NGN",
  locale: string = "en-NG",
) => {
  // Create a new instance of Intl.NumberFormat with the 'en-US' locale and currency set to 'NGN'.
  // This object provides methods to format numbers based on the specified locale and options.
  return new Intl.NumberFormat(locale, {
    // Set the style to 'currency' to format the number as a currency value.
    style: "currency",
    // Set the currency to 'NGN' to format the number as Nigerian Naira.
    currency,
  }).format(value); // Format the provided value as a currency string.
};

/**
 * Encrypts data using the provided public key.
 * @param data - The data to be encrypted.
 * @param publicKeyPEM - The public key in PEM format.
 * @returns The encrypted data as a base64-encoded string.
 */
export function publicKeyEncrypt(data: any, publicKeyPEM: string): string {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKeyPEM);

  const encrypted = encrypt.encrypt(JSON.stringify(data));
  if (encrypted === false) {
    throw new Error("Failed to encrypt data");
  }

  return encrypted;
}

/**
 * Converts an ISO 8601 date string to a human-readable "time ago" format.
 *
 * @param {string} isoString - The ISO 8601 date string to convert.
 * @returns {string} A human-readable string representing the time elapsed since the given date.
 */
export function formatTimeAgo(isoString: string): string {
  const now = new Date();
  const past = new Date(isoString);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  type TimeUnit = {
    name: string;
    value: number;
  };

  const units: TimeUnit[] = [
    { name: "year", value: 60 * 60 * 24 * 365 },
    { name: "month", value: 60 * 60 * 24 * 30 },
    { name: "day", value: 60 * 60 * 24 },
    { name: "hour", value: 60 * 60 },
    { name: "minute", value: 60 },
    { name: "second", value: 1 },
  ];

  for (const unit of units) {
    const elapsed = Math.floor(diffInSeconds / unit.value);
    if (elapsed >= 1) {
      if (unit.name === "year" && elapsed > 2) {
        return "a long time ago";
      }
      return `${elapsed} ${unit.name}${elapsed > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

/**
 * Fetches the supported tokens for the specified network.
 *
 * @param network - The network name.
 * @returns An array of supported tokens for the specified network.
 */
export function fetchSupportedTokens(
  network: string = "",
): Token[] | undefined {
  return {
    Base: [
      {
        name: "USD Coin",
        symbol: "USDC",
        decimals: 18,
        address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
      },
    ],
    "Base Sepolia": [
      {
        name: "Dai",
        symbol: "DAI",
        decimals: 18,
        address: "0x7683022d84f726a96c4a6611cd31dbf5409c0ac9",
      },
    ],
  }[network];
}

/**
 * Retrieves the contract address for the specified network.
 * @param network - The network for which to retrieve the contract address.
 * @returns The contract address for the specified network, or undefined if the network is not found.
 */
export function getGatewayContractAddress(
  network: string = "",
): string | undefined {
  return {
    Base: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
    "Base Sepolia": "0x847dfdaa218f9137229cf8424378871a1da8f625",
  }[network];
}
