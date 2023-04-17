import { NextApiRequest, NextApiResponse } from "next";
import { Save } from "@prisma/client";

import { prisma } from "~/db";
import { APIResponse } from "~/types";
import { createValidator, handleValidationError, ValidationError } from "~/validation";

const Query = createValidator((z) => z.object({
  saveID: z.string()
}));

export type GetSaveRes = APIResponse<Save>;
export type DeleteSaveRes = APIResponse<Save>;

export default async (req: NextApiRequest, res: NextApiResponse<GetSaveRes>) => {
  try {
    const { saveID } = Query.parse(req.query);

    let save: Save | null;
    if (req.method && req.method === "DELETE") {
      save = await prisma.save.delete({ where: { id: Number(saveID) } });
    } else {
      save = await prisma.save.findUnique({ where: { id: Number(saveID) }});
    }

    if (!save) {
      throw new Error(`could not find save with id ${saveID}`);
    }

    res.status(200).json({ data: save });
  } catch (err) {
    if (err instanceof ValidationError) {
      return handleValidationError(res, err);
    } else if (err instanceof Error) {
      return res.status(404).send({ error: { message: err.message }});
    }
  }
}
