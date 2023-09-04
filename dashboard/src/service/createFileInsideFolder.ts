import { GoogleData } from "@/types/google";
import axios, { AxiosResponse } from "axios";

export const createFileInsideFolder = async (token: string, folderId: string) => {
  const response: AxiosResponse<GoogleData> = await axios.post(
    `${process.env.SERVER_URL}/drive/file/${folderId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};
