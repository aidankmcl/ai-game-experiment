import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";

import { prisma } from "~/db";
import { APIResponse } from "~/types";
import { createValidator, handleValidationError, ValidationError } from "~/validation";

const Query = createValidator((z) => z.object({
  userID: z.string()
}));

export type GetUserRes = APIResponse<User>;
export type DeleteUserRes = APIResponse<User>;

export default async (req: NextApiRequest, res: NextApiResponse<GetUserRes>) => {
  try {
    const { userID } = Query.parse(req.query);

    let user: User | null;
    if (req.method && req.method === "DELETE") {
      user = await prisma.user.delete({ where: { id: Number(userID) } });
    } else {
      user = await prisma.user.findUnique({ where: { id: Number(userID) }});
    }

    if (!user) {
      throw new Error(`could not find user with id ${userID}`);
    }

    res.status(200).json({ data: user });
  } catch (err) {
    if (err instanceof ValidationError) {
      return handleValidationError(res, err);
    } else if (err instanceof Error) {
      return res.status(404).send({ error: { message: err.message }});
    }
  }
}
