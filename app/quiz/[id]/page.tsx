import Heading from '@/app/_components/heading';
import OptionsList from '@/app/_components/options-list';
import ProgressList from '@/app/_components/progress-list';
import Sidebar from '@/app/_components/sidebar';
import { getQuizElement, getQuizList } from '@/app/_lib/get-quiz-data';

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
  const { question, answers } = await getQuizElement(params.id);
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <Heading as="h2" className={styles.heading}>
          {question}
        </Heading>
        <OptionsList answers={answers} />
      </section>
      <Sidebar>
        <ProgressList id={+params.id} quizList={quizList} />
      </Sidebar>
    </main>
  );
}
