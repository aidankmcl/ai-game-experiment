import { GenerateBody, GenerateRes } from "pages/api/generate";

import { ClientsideResponse } from 'src/types';

export const sendPrompt = async (input: GenerateBody): ClientsideResponse<GenerateRes> => {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const res = await response.json();
  if (!res.data || response.status !== 200) {
    throw res.error || new Error(`Request failed with status ${response.status}`);
  }

  return res.data;
}
