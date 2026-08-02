import { asc, eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { QuizElement, QuizList } from '../shared'
import { db } from '@/lib/db'
import { quizAnswers, quizQuestions } from '@/lib/db/schema'

// `cache()` deduplicates calls within a single request — pages, generateMetadata,
// and server actions all share one round-trip to the DB per request.
export const getQuizList = cache(async (): Promise<QuizList> => {
  const questions = await db
    .select()
    .from(quizQuestions)
    .orderBy(asc(quizQuestions.step))

  const answers = await db.select().from(quizAnswers)

  return questions.map((q) => ({
    step: q.step,
    question: q.question,
    reward: q.reward,
    answers: answers
      .filter((a) => a.questionId === q.id)
      .map((a) => ({ id: a.answerId, title: a.title, isCorrect: a.isCorrect })),
  }))
})

export async function getQuizElement(id: number): Promise<QuizElement> {
  const [question] = await db
    .select()
    .from(quizQuestions)
    .where(eq(quizQuestions.step, id))
    .limit(1)

  if (!question) notFound()

  const answers = await db
    .select()
    .from(quizAnswers)
    .where(eq(quizAnswers.questionId, question.id))

  return {
    step: question.step,
    question: question.question,
    reward: question.reward,
    answers: answers.map((a) => ({
      id: a.answerId,
      title: a.title,
      isCorrect: a.isCorrect,
    })),
  }
}
