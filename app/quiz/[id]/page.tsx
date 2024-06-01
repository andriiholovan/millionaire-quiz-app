import Option from '@/app/_components/option';
import BurgerMenu from '@/app/_components/burger-menu';
import { getQuizElement } from '@/app/_lib/get-quiz-data';

import styles from '@/app/quiz/[id]/page.module.css';

export default async function Question({ params }: { params: { id: string } }) {
  const quizElement = await getQuizElement(params.id);
  return (
    <main className={styles.main}>
      <BurgerMenu />
      <h1 className={styles.heading}>
        {quizElement?.question}
      </h1>
      <div className={styles.options_group}>
        {quizElement?.answers.map((answer) => (
          <Option
            key={answer.title}
            title={answer.title}
            option={answer.option}
            isCorrect={answer.isCorrect}
          />
        ))}
      </div>
    </main>
  );
}
