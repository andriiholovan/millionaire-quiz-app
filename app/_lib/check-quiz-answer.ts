import { AnswerElement } from '@/app/_lib/schema';
import { getQuizElement } from '@/app/_lib/get-quiz-data';

export default async function checkQuizAnswer(
  step: string,
  answer: AnswerElement['id'],
): Promise<boolean> {
  const { answers } = await getQuizElement(step);
  return answers.find((element) => element.id === answer)?.isCorrect ?? false;
}
