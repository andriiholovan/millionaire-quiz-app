import HandIcon from '@/app/_components/hand-icon';
import Heading from '@/app/_components/heading';
import LinkTo from '@/app/_components/link';
import { getQuizList } from '@/app/_lib/get-quiz-data';

import styles from '@/app/page.module.css';

export default async function Home() {
  const [firstQuizOption] = await getQuizList();
  return (
    <main className={styles.main}>
      <HandIcon className={styles.logo} />
      <Heading>
        Who wants to be a&nbsp;millionaire?
      </Heading>
      <LinkTo href={`/quiz/${firstQuizOption.id}`}>
        Start
      </LinkTo>
    </main>
  );
}
