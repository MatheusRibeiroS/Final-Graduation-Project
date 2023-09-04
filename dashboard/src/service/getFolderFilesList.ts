import { GoogleData } from "@/types/google";
import axios, { AxiosResponse } from "axios";

export const getFolderFilesList = async (token: string, folderId: string) => {
  const response: AxiosResponse<GoogleData> = await axios.get(
    `${process.env.SERVER_URL}/drive/folder/${folderId}/files`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};
