import { NextApiRequest, NextApiResponse } from "next";
import { Save } from "@prisma/client";

import { prisma } from "~/db";
import { APIResponse } from "~/types";
import { createValidator, inferShape, handleValidationError, ValidationError } from "~/validation";

const Body = createValidator((z) => z.object({
  name: z.string().min(2),
  userID: z.number(),
  summary: z.string().optional(),
}));

const Params = createValidator((z) => z.object({
  user: z.string(),
}));

export type CreateSaveBody = inferShape<typeof Body>;
export type CreateSaveRes = APIResponse<Save>;

export type GetSavesRes = APIResponse<Save[]>;

export default async (req: NextApiRequest, res: NextApiResponse<GetSavesRes | CreateSaveRes>) => {
  try {
    if (req.method && req.method === "POST") {
      const body = Body.parse(req.body);
      const { name, userID, summary } = body;

      const save = await prisma.save.create({ data: {
        name,
        summary: summary || '',
        userID
      }});

      res.status(200).json({ data: save });
    } else {
      const params = Params.parse(req.query);
      const options = params.user ? { where: { userID: Number(params.user) }} : undefined;

      const saves = await prisma.save.findMany(options);
      res.status(200).json({ data: saves });
    }
  } catch (err) {
    if (err instanceof ValidationError) {
      return handleValidationError(res, err);
    } else if (err instanceof Error) {
      res.status(500).json({ error: { message: err.message }})
    }
  }
}
