import { NextApiRequest, NextApiResponse } from "next";
import { Action } from "@prisma/client";

import { prisma } from "~/db";
import { APIResponse, ActionType } from "~/types";
import { createValidator, inferShape, handleValidationError, ValidationError } from "~/validation";

const Query = createValidator((z) => z.object({
  saveID: z.string()
}));

const Body = createValidator((z) => z.object({
  content: z.string(),
  instruction: z.string()
}));

export type CreateActionBody = inferShape<typeof Body>;
export type CreateActionRes = APIResponse<Action>;

export type GetActionsRes = APIResponse<Action[]>;

export default async (req: NextApiRequest, res: NextApiResponse<GetActionsRes | CreateActionRes>) => {
  try {
    const query = Query.parse(req.query);
    const { saveID } = query;

    if (req.method && req.method === "POST") {      
      const body = Body.parse(req.body);
      const { content, instruction } = body;

      const action = await prisma.action.create({ data: {
        type: ActionType.USER,
        content,
        instruction,
        saveID: Number(saveID)
      }});

      res.status(200).json({ data: action });
    } else {
      const actions = await prisma.action.findMany({ where: { saveID: Number(saveID) }});
      res.status(200).json({ data: actions });
    }
  } catch (err) {
    if (err instanceof ValidationError) {
      return handleValidationError(res, err);
    } else if (err instanceof Error) {
      res.status(500).json({ error: { message: err.message }})
    }
  }
}
