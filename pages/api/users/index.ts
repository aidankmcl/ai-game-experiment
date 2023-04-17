import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";

import { prisma } from "~/db";
import { APIResponse } from "~/types";
import { createValidator, inferShape, handleValidationError, ValidationError } from "~/validation";

const Body = createValidator((z) => z.object({
  name: z.string().min(2)
}));

export type CreateUserBody = inferShape<typeof Body>;
export type CreateUserRes = APIResponse<User>;

export type GetUsersRes = APIResponse<User[]>;

export default async (req: NextApiRequest, res: NextApiResponse<GetUsersRes | CreateUserRes>) => {
  try {
    if (req.method && req.method === "POST") {
      const body = Body.parse(req.body);
      const { name } = body;

      const user = await prisma.user.create({ data: {
        name,
        saves: {
          create: {
            name: 'default',
            summary: ''
          }
        }
      }});

      res.status(200).json({ data: user });
    } else {
      const users = await prisma.user.findMany();
      res.status(200).json({ data: users });
    }
  } catch (err) {
    if (err instanceof ValidationError) {
      return handleValidationError(res, err);
    } else if (err instanceof Error) {
      res.status(500).json({ error: { message: err.message }});
    }
  }
}
