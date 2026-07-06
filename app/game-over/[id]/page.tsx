import { Button, Confetti, HandIcon, Heading } from '@components'
import { getQuizList, validateRouteParam } from '@lib/server'
import z from 'zod'
import type { Metadata } from 'next'

import styles from './page.module.css'

type GameOverPageProps = {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({
  params,
}: GameOverPageProps): Promise<Metadata> {
  const { id } = await params
  const quizId = validateRouteParam(id, z.coerce.number())
  return {
    title: quizId === 12 ? 'Congratulations!' : 'Game Over',
    description: `You earned $1000000 (no, you didn't)`,
  }
}

export default async function GameOverPage({ params }: GameOverPageProps) {
  const { id } = await params
  const quizList = await getQuizList()
  const quizId = validateRouteParam(id, z.coerce.number())
  const reward = quizList[quizId - 1]?.reward ?? 0
  return (
    <main className={styles.main}>
      {quizId === 12 ? <Confetti /> : null}
      <div className={styles.logo_container}>
        <HandIcon />
      </div>
      <div className={styles.content_container}>
        <p className={styles.description}>Total score:</p>
        <Heading as="h2" className={styles.heading}>
          {`$${reward} earned`}
        </Heading>
        <Button.Primary push to="/">
          Try again
        </Button.Primary>
      </div>
    </main>
  )
}
