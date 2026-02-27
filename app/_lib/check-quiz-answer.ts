import { getQuizElement } from '@/app/_lib/get-quiz-data'
import { AnswerElement } from '@/app/_lib/schema'

export default async function checkQuizAnswer(
  step: number,
  answer: AnswerElement['id'],
): Promise<boolean> {
  const { answers } = await getQuizElement(step)
  return answers.find((element) => element.id === answer)?.isCorrect ?? false
}
