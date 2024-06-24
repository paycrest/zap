import { InstitutionProps } from "./types";

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