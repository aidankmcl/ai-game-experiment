import { NextApiRequest, NextApiResponse } from "next";

import { OpenAI } from "src/openai";
import { APIResponse } from "src/types";
import { handleOpenAIError, OpenAIError, createValidator, inferShape } from "src/validation";

const openaiAPI = new OpenAI();

const [Body, handleValidationError, ValidationError] = createValidator((z) => z.object({
  prompt: z.string().min(2)
}));

export type GenerateBody = inferShape<typeof Body>;
export type GenerateRes = APIResponse<string>;


export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { prompt } = Body.parse(req.body);
    const response = await openaiAPI.answer(prompt);

    res.status(200).json({ data: response || "No text returned" });
  } catch (err) {
    if (err instanceof ValidationError) {
      return handleValidationError(res, err);
    } else if (err instanceof OpenAIError) {
      return handleOpenAIError(res, err);
    }
  }
}
