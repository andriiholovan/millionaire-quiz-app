import { AnswerElement } from '../shared'
import { getQuizElement } from './get-quiz-data'

export async function checkQuizAnswer(
  step: number,
  answer: AnswerElement['id'],
): Promise<boolean> {
  const { answers } = await getQuizElement(step)
  return answers.find((element) => element.id === answer)?.isCorrect ?? false
}
