import axios from "axios";
import { RatesPayload, RatesResponse } from "../types";

const API_URL = "https://staging-api.paycrest.io/v1/rates";

export const fetchRates = async ({
  token,
  amount,
  currency,
}: RatesPayload): Promise<RatesResponse> => {
  try {
    const response = await axios.get(
      `${API_URL}/${token}/${amount}/${currency}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching rates:", error);
    throw error;
  }
};
