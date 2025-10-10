import { notFound } from 'next/navigation';
import z from 'zod';

export default function validateRouteParam<Input, Output>(
  param: Input,
  schema: z.Schema<Output>,
  onErrorCallback: () => never = notFound,
): z.ZodSafeParseSuccess<Output>['data'] | never {
  const { error, data } = schema.safeParse(param);
  if (error) {
    onErrorCallback();
  }
  return data;
}
