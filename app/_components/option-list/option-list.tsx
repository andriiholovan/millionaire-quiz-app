'use client'

import { processAnswer } from '@actions'
import { getOptionLabel } from '@lib/client'
import { AnswersList } from '@lib/shared'
import Form from 'next/form'
import { OptionItem } from '../option-item'

import styles from './option-list.module.css'

type OptionsListProps = {
  answers: AnswersList
}

export function OptionList({ answers }: OptionsListProps) {
  return (
    <Form action={processAnswer} className={styles.option_group}>
      {answers.map((answer) => {
        const label = getOptionLabel(answer.id)
        return (
          <OptionItem
            key={answer.id}
            className={styles.answer}
            id={answer.id}
            isCorrect={answer.isCorrect}
          >
            <span className={styles.answer_label}>{label}</span>
            <span className={styles.answer_title}>{answer.title}</span>
          </OptionItem>
        )
      })}
    </Form>
  )
}
