import { GoogleData } from "@/types/google";
import axios, { AxiosResponse } from "axios";

export const getFileById = async (token: string, fileId: string) => {
  const response: AxiosResponse<GoogleData> = await axios.get(
    `${process.env.SERVER_URL}/drive/getOne/${fileId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};
