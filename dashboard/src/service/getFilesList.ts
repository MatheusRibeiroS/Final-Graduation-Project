import { GoogleData } from "@/types/google";
import axios, { AxiosResponse } from "axios";

export const getFiles = async (token: string) => {
  const response: AxiosResponse<GoogleData> = await axios.get(
    `${process.env.SERVER_URL}/drive`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};
