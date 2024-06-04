import Button from '@/app/_components/button';
import HandIcon from '@/app/_components/hand-icon';
import Heading from '@/app/_components/heading';

import styles from '@/app/game-over/[id]/page.module.css';
import { getQuizElement } from '@/app/_lib/get-quiz-data';

type GameOverPageProps = {
  params: {
    id: string;
  }
};

export default async function GameOverPage({
  params,
}: GameOverPageProps) {
  const { reward } = await getQuizElement(params.id);
  return (
    <main className={styles.main}>
      <div className={styles.logo_container}>
        <HandIcon className={styles.logo} />
      </div>
      <div className={styles.content_container}>
        <div className={styles.title_container}>
          <p className={styles.description}>
            Total score:
          </p>
          <Heading as="h2" className={styles.heading}>
            {`$${reward} earned`}
          </Heading>
        </div>
        <Button
          isPrimary
          className={styles.link}
          href="/"
        >
          Try again
        </Button>
      </div>
    </main>
  );
}
