import { QuizElement } from '@lib/shared'
import cn from 'classnames'
import { ProgressFrame } from '../assets'

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
          <ProgressFrame
            classNames={{
              base: styles.frame,
              desktop: styles.frame_desktop,
              mobile: styles.frame_mobile,
            }}
          />
          <span className={styles.reward}>{quiz.reward}</span>
        </li>
      ))}
    </ul>
  )
}
