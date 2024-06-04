import HandIcon from '@/app/_components/hand-icon';
import Heading from '@/app/_components/heading';
import LinkTo from '@/app/_components/link';
import { getQuizList } from '@/app/_lib/get-quiz-data';

import styles from '@/app/page.module.css';

export default async function Home() {
  const [firstQuizOption] = await getQuizList();
  return (
    <main className={styles.main}>
      <div className={styles.title_group}>
        <HandIcon className={styles.logo} />
        <Heading as="h1" className={styles.heading}>
          Who wants to be a&nbsp;millionaire?
        </Heading>
      </div>
      <LinkTo
        className={styles.link}
        href={`/quiz/${firstQuizOption.step}`}
      >
        Start
      </LinkTo>
    </main>
  );
}
