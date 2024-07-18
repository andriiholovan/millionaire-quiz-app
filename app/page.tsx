import Button from '@/app/_components/button';
import HandIcon from '@/app/_components/hand-icon';
import Heading from '@/app/_components/heading';
import { getQuizList } from '@/app/_lib/get-quiz-data';
import throwGlobalError from '@/app/_lib/throw-global-error';

import styles from '@/app/page.module.css';

type HomePageProps = {
  searchParams: {
    kill_app: boolean;
  }
};

export const dynamic = 'force-static';

export default async function Home({
  searchParams,
}: HomePageProps) {
  if (searchParams.kill_app) throwGlobalError();
  const [firstQuizOption] = await getQuizList();
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
  );
}
