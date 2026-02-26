import { notFound } from 'next/navigation'
import { QuizElement, QuizList, QuizListSchema } from '@/app/_lib/schema'

const { QUIZ_DATA_URL = 'https://api.npoint.io/b7bd9c92c028169450f0' } =
  process.env

export async function getQuizList(): Promise<QuizList> {
  const data = await fetch(QUIZ_DATA_URL).then((res) => res.json())
  const parsedData = QuizListSchema.safeParse(data)
  if (parsedData.error) {
    throw parsedData.error
  }
  return parsedData.data
}

export async function getQuizElement(id: number): Promise<QuizElement> {
  const list = await getQuizList()
  const element = list.find((item) => item.step === Number(id))
  if (!element) notFound()
  return element
}
