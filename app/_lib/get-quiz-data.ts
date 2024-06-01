import { z } from 'zod';

const QuizListSchema = z.array(
  z.object({
    id: z.string(),
    question: z.string(),
    reward: z.number(),
    answers: z.array(z.object({
      title: z.string(),
      option: z.string(),
      isCorrect: z.boolean(),
    })),
  }),
);

const QUIZ_DATA_URL = 'https://api.npoint.io/b7bd9c92c028169450f0';

export async function getQuizList(): Promise<z.infer<typeof QuizListSchema>> {
  const data = await fetch(QUIZ_DATA_URL).then((res) => res.json());
  const validData = QuizListSchema.safeParse(data);
  if (validData.success) {
    return validData.data;
  }
  if (validData.error) {
    throw validData.error;
  }
  return [];
}

export async function getQuizElement(
  id: string,
): Promise<z.infer<typeof QuizListSchema.element> | undefined> {
  const list = await getQuizList();
  return list.find((element) => element.id === id);
}
