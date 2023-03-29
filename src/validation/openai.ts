import { AxiosError } from "axios";
import { NextApiResponse } from "next";

export const OpenAIError = AxiosError;

export const handleOpenAIError = (res: NextApiResponse, err: AxiosError) => {
  if (err.response) {
    return res.status(err.response.status).json(err.response.data);
  } else {
    return res.status(500).json({
      error: {
        message: `Error with Open API request: ${err.message}`,
      }
    });
  }
}
