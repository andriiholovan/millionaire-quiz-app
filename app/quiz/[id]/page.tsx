import z from 'zod';
import Heading from '@/app/_components/heading';
import OptionsList from '@/app/_components/options-list';
import ProgressList from '@/app/_components/progress-list';
import Sidebar from '@/app/_components/sidebar';
import { getQuizElement, getQuizList } from '@/app/_lib/get-quiz-data';
import validateRouteParam from '@/app/_lib/validate-route-param';

import styles from '@/app/quiz/[id]/page.module.css';

type QuizPageProps = {
  params: {
    id: string;
  }
};

export default async function QuizPage({
  params,
}: QuizPageProps) {
  const quizList = await getQuizList();
  const quizId = validateRouteParam(params.id, z.coerce.number());
  const { question, answers } = await getQuizElement(quizId);
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <Heading as="h2" className={styles.heading}>
          {question}
        </Heading>
        <OptionsList answers={answers} />
      </section>
      <Sidebar>
        <ProgressList id={quizId} quizList={quizList} />
      </Sidebar>
    </main>
  );
}
