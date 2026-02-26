import z from 'zod'
import Button from '@/app/_components/button'
import Confetti from '@/app/_components/confetti'
import HandIcon from '@/app/_components/hand-icon.icon'
import Heading from '@/app/_components/heading'
import { getQuizList } from '@/app/_lib/get-quiz-data'
import validateRouteParam from '@/app/_lib/validate-route-param'

import styles from '@/app/game-over/[id]/page.module.css'

type GameOverPageProps = {
  params: Promise<{
    id: string
  }>
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
