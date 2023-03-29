import { NextApiResponse } from "next";
import Zod, { ZodError, ZodObject, ZodParsedType, ZodRawShape, ZodType } from "zod";

import { fromZodError } from 'zod-validation-error';

export const ValidationError = Zod.ZodError;

export type inferShape<T extends ZodType<unknown>> = Zod.infer<T>;

const handleZodError = (res: NextApiResponse, err: Zod.ZodError) => {
  return res.status(402).json({ error: { message: fromZodError(err) } });
}

type createValidatorResult<T extends ZodRawShape> = [ZodObject<T>, typeof handleZodError, typeof ValidationError]

export const createValidator = <T extends ZodRawShape>(
  validatorDefintion: (z: typeof Zod) => ZodObject<T>
): createValidatorResult<T> => {
  const validator = validatorDefintion(Zod);

  return [validator, handleZodError, ValidationError];
}
