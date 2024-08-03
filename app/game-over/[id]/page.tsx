import Button from '@/app/_components/button';
import Confetti from '@/app/_components/confetti';
import HandIcon from '@/app/_components/hand-icon';
import Heading from '@/app/_components/heading';

import styles from '@/app/game-over/[id]/page.module.css';
import { getQuizList } from '@/app/_lib/get-quiz-data';

type GameOverPageProps = {
  params: {
    id: string;
  }
};

export default async function GameOverPage({
  params,
}: GameOverPageProps) {
  const quizList = await getQuizList();
  const reward = quizList[+params.id - 1]?.reward ?? 0;
  return (
    <main className={styles.main}>
      {params.id === '12' ? <Confetti /> : null}
      <div className={styles.logo_container}>
        <HandIcon />
      </div>
      <div className={styles.content_container}>
        <p className={styles.description}>
          Total score:
        </p>
        <Heading as="h2" className={styles.heading}>
          {`$${reward} earned`}
        </Heading>
        <Button.Primary push to="/">
          Try again
        </Button.Primary>
      </div>
    </main>
  );
}
