import { notFound } from 'next/navigation'
import { cache } from 'react'
import { QuizElement, QuizList, QuizListSchema } from '../shared'

const { QUIZ_DATA_URL = 'https://api.npoint.io/b7bd9c92c028169450f0' } =
  process.env

// `cache()` dedupes calls within a single request so the multiple callers
// (page, generateMetadata, server action) share one fetch. The `next.revalidate`
// + `tags` options cache the static quiz data across requests (revalidate via
// `revalidateTag('quiz', 'max')` if the source data ever changes).
export const getQuizList = cache(async (): Promise<QuizList> => {
  const res = await fetch(QUIZ_DATA_URL, {
    next: { revalidate: 3600, tags: ['quiz'] },
  })
  if (!res.ok) {
    throw new Error(
      `Failed to fetch quiz data: ${res.status} ${res.statusText}`,
    )
  }
  const data = await res.json()
  const parsedData = QuizListSchema.safeParse(data)
  if (parsedData.error) {
    throw parsedData.error
  }
  return parsedData.data
})

export async function getQuizElement(id: number): Promise<QuizElement> {
  const list = await getQuizList()
  const element = list.find((item) => item.step === Number(id))
  if (!element) notFound()
  return element
}
