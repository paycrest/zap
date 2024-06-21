/**
 * Retrieves the institution name based on the provided institution code.
 *
 * @param code - The institution code.
 * @returns The institution name associated with the provided code, or undefined if not found.
 */
export function getInstitutionNameByCode(
  code: string,
  supportedInstitutions: Record<string, Record<string, string>>,
) {
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
export function getInstitutionCurrencyByCode(
  code: string,
  supportedInstitutions: Record<string, Record<string, string>>,
) {
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
