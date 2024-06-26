import axios from "axios";
import {
  RatePayload,
  RateResponse,
  InstitutionProps,
  PubkeyResponse,
} from "../types";

const API_URL = "https://staging-api.paycrest.io/v1";

export const fetchRate = async ({
  token,
  amount,
  currency,
}: RatePayload): Promise<RateResponse> => {
  try {
    const response = await axios.get(
      `${API_URL}/rates/${token}/${amount}/${currency}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching rate:", error);
    throw error;
  }
};

export const fetchSupportedInstitutions = async (
  currency: string,
): Promise<InstitutionProps[]> => {
  try {
    const response = await axios.get(`${API_URL}/institutions/${currency}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching supported institutions:", error);
    throw error;
  }
};

export const fetchAggregatorPublicKey = async (): Promise<PubkeyResponse> => {
  try {
    const response = await axios.get(`${API_URL}/pubkey`);
    return response.data;
  } catch (error) {
    console.error("Error fetching aggregator public key:", error);
    throw error;
  }
};
