import { Heading, OptionList, ProgressList, Sidebar } from '@components'
import { getQuizElement, getQuizList, validateRouteParam } from '@lib/server'
import z from 'zod'
import type { Metadata } from 'next'

import styles from './page.module.css'

type QuizPageProps = {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({
  params,
}: QuizPageProps): Promise<Metadata> {
  const { id } = await params
  return {
    title: `Question ${id} | Who wants to be a millionaire?`,
  }
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { id } = await params
  const quizList = await getQuizList()
  const quizId = validateRouteParam(id, z.coerce.number())
  const { question, answers } = await getQuizElement(quizId)
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <Heading as="h2" className={styles.heading}>
          {question}
        </Heading>
        <OptionList answers={answers} />
      </section>
      <Sidebar>
        <ProgressList id={quizId} quizList={quizList} />
      </Sidebar>
    </main>
  )
}
