import { Button, HandIcon, Heading } from '@components'
import { getQuizList } from '@lib/server'

import styles from './page.module.css'

export default async function Home() {
  const [firstQuizOption] = await getQuizList()
  return (
    <main className={styles.main}>
      <div className={styles.logo_container}>
        <HandIcon />
      </div>
      <div className={styles.content_container}>
        <Heading as="h1" className={styles.heading}>
          Who wants to be a&nbsp;millionaire?
        </Heading>
        <Button.Primary push to={`/quiz/${firstQuizOption.step}`}>
          Start
        </Button.Primary>
      </div>
    </main>
  )
}
