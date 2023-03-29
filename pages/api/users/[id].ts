import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";

import { prisma } from "src/db";
import { APIResponse } from "src/types";
import { createValidator } from "src/validation";

const [Query, handleError, ValidationError] = createValidator((z) => z.object({
  id: z.number()
}))

export type GetUserRes = APIResponse<User>;

export default async (req: NextApiRequest, res: NextApiResponse<GetUserRes>) => {
  try {
    const { id } = Query.parse(req.query);
    const user = await prisma.user.findUnique({ where: { id }});
    if (!user) {
      throw new Error(`could not find user with id ${id}`);
    }

    res.status(200).json({ data: user });
  } catch (err) {
    if (err instanceof ValidationError) {
      return handleError(res, err);
    } else if (err instanceof Error) {
      return res.status(404).send({ error: { message: err.message }});
    }
  }
}
