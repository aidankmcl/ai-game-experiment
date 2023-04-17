import { NextApiRequest, NextApiResponse } from "next";

import { OpenAI, generateActionPrompt } from "~/openai";
import { APIResponse, ActionType } from "src/types";
import { handleOpenAIError, OpenAIError, createValidator, inferShape, handleValidationError, ValidationError } from "src/validation";
import { prisma } from "~/db";

const openaiAPI = new OpenAI();

const Body = createValidator((z) => z.object({
  prompt: z.string().min(10),
  saveID: z.number(),
  previousActions: z.array(z.string())
}));

export type GenerateBody = inferShape<typeof Body>;
export type GenerateRes = APIResponse<string>;


export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { prompt, saveID } = Body.parse(req.body);

    const previousActions = await prisma.action.findMany({ where: { saveID }, orderBy: [{ createdAt: 'asc' }] });
    const newActionPromise = prisma.action.create({
      data: {
        type: ActionType.USER,
        content: prompt,
        instruction: '',
        saveID
      }
    });

    const promptWithContext = generateActionPrompt(prompt, previousActions);

    const [response] = await Promise.all([openaiAPI.answer(promptWithContext), newActionPromise]);

    await prisma.action.create({
      data: {
        type: ActionType.GENERATED,
        content: response || '',
        instruction: '',
        saveID
      }
    });

    res.status(200).json({ data: response || "No text returned" });
  } catch (err) {
    if (err instanceof ValidationError) {
      return handleValidationError(res, err);
    } else if (err instanceof OpenAIError) {
      return handleOpenAIError(res, err);
    }
  }
}
