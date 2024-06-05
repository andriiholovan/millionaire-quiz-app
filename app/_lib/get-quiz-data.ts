// import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';
import { QuizElement, QuizList, QuizListSchema } from '@/app/_lib/schema';

const { QUIZ_DATA_URL = 'https://api.npoint.io/b7bd9c92c028169450f0' } = process.env;

export async function getQuizList(): Promise<QuizList> {
  // revalidatePath('/', 'layout');
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
): Promise<QuizElement> {
  const list = await getQuizList();
  const element = list.find((item) => item.step === Number(id));
  if (!element) notFound();
  return element;
}
