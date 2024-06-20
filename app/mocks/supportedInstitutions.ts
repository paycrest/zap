// Map of bank codes to friendly bank names
export const supportedInstitutions: Record<string, Record<string, string>> = {
  NGN: {
    ABNGNGLA: "Access Bank",
    DBLNNGLA: "Diamond Bank",
    FIDTNGLA: "Fidelity Bank",
    FCMBNGLA: "First City Monument Bank",
    FBNINGLA: "First Bank of Nigeria",
    GTBINGLA: "Guaranty Trust Bank",
    PRDTNGLA: "Providus Bank",
    UBNINGLA: "United Bank for Africa",
    UNAFNGLA: "Union Bank",
    CITINGLA: "Citibank",
    ECOCNGLA: "Ecobank",
    HBCLNGLA: "Heritage Bank",
    PLNINGLA: "Polaris Bank",
    SBICNGLA: "State Bank of India",
    SCBLNGLA: "Standard Chartered Bank",
    NAMENGLA: "Namaste Bank",
    ICITNGLA: "Icicle Bank",
    SUTGNGLA: "Sutton Bank",
    PROVNGLA: "Providence Bank",
    KDHLNGLA: "Kaduna Bank",
    GMBLNGLA: "Gombe Bank",
    FSDHNGLA: "FSDH Merchant Bank",
    FIRNNGLA: "Firstrand Bank",
    JAIZNGLA: "Jaiz Bank",
    ZEIBNGLA: "Zenith Bank",
    KUDANGPC: "Kuda Bank",
    OPAYNGPC: "OPay",
    MONINGPC: "Moniepoint",
    PALMNGPC: "PalmPay",
    SAHVNGPC: "SAH Tech Bank",
  },
};

/**
 * Retrieves the institution name based on the provided institution code.
 *
 * @param code - The institution code.
 * @returns The institution name associated with the provided code, or undefined if not found.
 */
export function getInstitutionNameByCode(code: string) {
  let institutionName;

  // Loop through the keys of supportedInstitutions object
  for (const fiatCurrencyKey in supportedInstitutions) {
    if (
      Object.prototype.hasOwnProperty.call(
        supportedInstitutions,
        fiatCurrencyKey,
      )
    ) {
      // Check if the recipient's institution code exists in the current fiat currency's institutions
      if (supportedInstitutions[fiatCurrencyKey][code]) {
        institutionName = supportedInstitutions[fiatCurrencyKey][code];
        break; // Exit the loop once the institution name is found
      }
    }
  }

  return institutionName;
}

/**
 * Retrieves the currency of an institution based on its code.
 * @param code - The code of the institution.
 * @returns The currency of the institution.
 */
export function getInstitutionCurrencyByCode(code: string) {
  let currency;

  // Loop through the keys of supportedInstitutions object
  for (const fiatCurrencyKey in supportedInstitutions) {
    if (
      Object.prototype.hasOwnProperty.call(
        supportedInstitutions,
        fiatCurrencyKey,
      )
    ) {
      // Check if the recipient's institution code exists in the current fiat currency's institutions
      if (supportedInstitutions[fiatCurrencyKey][code]) {
        currency = fiatCurrencyKey;
        break; // Exit the loop once the institution name is found
      }
    }
  }

  return currency;
}
