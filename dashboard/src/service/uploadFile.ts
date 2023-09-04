import { GoogleData } from "@/types/google";
import axios, { AxiosResponse } from "axios";

export const uploadFile = async (token: string, folderId: string) => {
  const response: AxiosResponse<GoogleData> = await axios.post(
    `${process.env.SERVER_URL}/drive/upload/file/${folderId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};
