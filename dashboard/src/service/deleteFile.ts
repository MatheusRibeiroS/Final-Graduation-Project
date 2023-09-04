import { GoogleData } from "@/types/google";
import axios, { AxiosResponse } from "axios";

export const deleteFile = async (token: string, fileId: string) => {
  const response: AxiosResponse<GoogleData> = await axios.delete(
    `${process.env.SERVER_URL}/drive/delete/file/${fileId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};
