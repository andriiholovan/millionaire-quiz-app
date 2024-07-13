import classNames from 'classnames';
import { QuizElement } from '@/app/_lib/schema';

import styles from '@/app/_components/progress-list.module.css';

type ProgressListProps = {
  id: number;
  quizList: Pick<QuizElement, 'reward' | 'step'>[];
};

export default function ProgressList({
  id,
  quizList,
}: ProgressListProps) {
  return (
    <ul className={styles.progress_group}>
      {quizList.map((quiz) => (
        <li
          key={quiz.step}
          className={classNames(
            styles.progress,
            id === quiz.step && styles.progress_current,
            id > quiz.step && styles.progress_previous,
            id < quiz.step && styles.progress_next,
          )}
        >
          {quiz.reward}
        </li>
      ))}
    </ul>
  );
}
