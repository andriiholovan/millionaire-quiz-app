import { QuizElement } from '@lib/shared'
import cn from 'classnames'

import styles from './progress-list.module.css'

type ProgressListProps = {
  id: number
  quizList: Pick<QuizElement, 'reward' | 'step'>[]
}

export function ProgressList({ id, quizList }: ProgressListProps) {
  return (
    <ul className={styles.progress_group}>
      {quizList.map((quiz) => (
        <li
          key={quiz.step}
          className={cn(
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
  )
}
