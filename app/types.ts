import z from 'zod';

const EnvVariablesSchema = z.object({
  QUIZ_DATA_URL: z.string(),
});

EnvVariablesSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv
      extends z.infer<typeof EnvVariablesSchema> {}
  }
}
