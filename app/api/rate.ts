import axios from "axios";
import { RatePayload, RateResponse } from "../types";

const API_URL = "https://staging-api.paycrest.io/v1/rates";

export const fetchRate = async ({
  token,
  amount,
  currency,
}: RatePayload): Promise<RateResponse> => {
  try {
    const response = await axios.get(
      `${API_URL}/${token}/${amount}/${currency}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching rate:", error);
    throw error;
  }
};
