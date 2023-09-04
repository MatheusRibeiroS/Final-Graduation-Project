import { GoogleData } from "@/types/google";
import axios, { AxiosResponse } from "axios";

export const getCredentials = async () => {
  try {
    const response: AxiosResponse<GoogleData> = await axios.get(`/api/`);
    return response;
  } catch (error) {
    console.log("error", error);
  }
};
