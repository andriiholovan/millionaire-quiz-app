import Button from '@/app/_components/button';
import HandIcon from '@/app/_components/hand-icon';
import Heading from '@/app/_components/heading';
import { getQuizList } from '@/app/_lib/get-quiz-data';

import styles from '@/app/page.module.css';

export default async function Home() {
  const [firstQuizOption] = await getQuizList();
  return (
    <main className={styles.main}>
      <div className={styles.logo_container}>
        <HandIcon className={styles.logo} />
      </div>
      <div className={styles.content_container}>
        <Heading as="h1" className={styles.heading}>
          Who wants to be a&nbsp;millionaire?
        </Heading>
        <Button
          isPrimary
          className={styles.link}
          href={`/quiz/${firstQuizOption.step}`}
        >
          Start
        </Button>
      </div>
    </main>
  );
}
