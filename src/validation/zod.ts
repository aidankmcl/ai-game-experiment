import { NextApiResponse } from "next";
import Zod, { ZodObject, ZodRawShape, ZodType } from "zod";

import { fromZodError } from 'zod-validation-error';

export const ValidationError = Zod.ZodError;

export type inferShape<T extends ZodType<unknown>> = Zod.infer<T>;

export const handleValidationError = (res: NextApiResponse, err: Zod.ZodError) => {
  const niceError = fromZodError(err).details.map((err) => err.message).join("\n");
  return res.status(402).json({ error: { message: niceError } });
}

type createValidatorResult<T extends ZodRawShape> = ZodObject<T>;

export const createValidator = <T extends ZodRawShape>(
  validatorDefintion: (z: typeof Zod) => ZodObject<T>
): createValidatorResult<T> => {
  return validatorDefintion(Zod);
}
