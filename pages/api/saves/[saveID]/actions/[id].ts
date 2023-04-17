import { NextApiRequest, NextApiResponse } from "next";
import { Action } from "@prisma/client";

import { prisma } from "~/db";
import { APIResponse } from "~/types";
import { createValidator, handleValidationError, ValidationError } from "~/validation";

const Query = createValidator((z) => z.object({
  id: z.string()
}))

export type GetActionRes = APIResponse<Action>;
export type DeleteActionRes = APIResponse<Action>;

export default async (req: NextApiRequest, res: NextApiResponse<GetActionRes>) => {
  try {
    const { id } = Query.parse(req.query);

    let action: Action | null;
    if (req.method && req.method === "DELETE") {
      action = await prisma.action.delete({ where: { id: Number(id) } });
    } else {
      action = await prisma.action.findUnique({ where: { id: Number(id) }});
    }

    if (!action) {
      throw new Error(`could not find action with id ${id}`);
    }

    res.status(200).json({ data: action });
  } catch (err) {
    if (err instanceof ValidationError) {
      return handleValidationError(res, err);
    } else if (err instanceof Error) {
      return res.status(404).send({ error: { message: err.message }});
    }
  }
}
