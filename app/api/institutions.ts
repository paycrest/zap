import axios from "axios";
import { InstitutionProps } from "../types";

const API_URL = "https://staging-api.paycrest.io/v1/institutions";

export const fetchSupportedInstitutions = async (
  currency: string,
): Promise<InstitutionProps[]> => {
  try {
    const response = await axios.get(`${API_URL}/${currency}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching supported institutions:", error);
    throw error;
  }
};
