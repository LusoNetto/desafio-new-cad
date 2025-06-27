import { z } from 'zod';

export const bookmarkBodySchema = z.object({
  flightId: z.number({ required_error: 'flightId é obrigatório' })
});

export const bookmarkParamsSchema = z.object({
  flightId: z.string().transform((val, ctx) => {
    const num = Number(val);
    if (isNaN(num)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'flightId deve ser um número válido'
      });
      return z.NEVER;
    }
    return num;
  })
});
