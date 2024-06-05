import { z } from 'zod';

export const QuizListSchema = z.array(
  z.object({
    step: z.number().int().min(1),
    question: z.string(),
    reward: z.string(),
    answers: z.array(z.object({
      id: z.string(),
      isCorrect: z.boolean(),
      title: z.string().max(30),
    })),
  }),
)
  // mutate data to make sure that the list is sorted by list.step property
  .transform((schema) => schema.sort((a, b) => a.step - b.step))
  // as the list is sorted now, lets check that the list is a sequence by list.step property
  // Btw, we are checking only the last element to simplify the process
  .refine(
    (schema) => schema[schema.length - 1].step === schema.length,
    (schema) => ({
      message: `Property step should be unique integer in interval [1, ${schema.length}]`,
      path: ['Array[\'step\']'],
    }),
  );

export type QuizList = z.infer<typeof QuizListSchema>;
export type QuizElement = QuizList[number];
export type AnswersList = QuizElement['answers'];
export type AnswerElement = QuizElement['answers'][number];
