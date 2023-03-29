import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";

import { prisma } from "src/db";
import { APIResponse } from "src/types";
import { createValidator, inferShape } from "src/validation";

const [Body, handleError, ValidationError] = createValidator((z) => z.object({
  name: z.string().min(5)
}))

export type CreateUserBody = inferShape<typeof Body>;
export type CreateUserRes = APIResponse<User>;

export type GetUsersRes = APIResponse<User[]>;

export default async (req: NextApiRequest, res: NextApiResponse<GetUsersRes | CreateUserRes>) => {
  try {
    if (req.method && req.method === "POST") {
      const body = Body.parse(req.body);

      const { name } = body;
      const user = await prisma.user.create({ data: { name } });

      res.status(200).json({ data: user });
    } else {
      const users = await prisma.user.findMany();
      res.status(200).json({ data: users });
    }
  } catch (err) {
    if (err instanceof ValidationError) {
      return handleError(res, err);
    } else if (err instanceof Error) {
      res.status(500).json({ error: { message: err.message }})
    }
  }
}
