'use client'

import Form from 'next/form'
import processAnswer from '@/app/_actions/process-answer'
import OptionItem from '@/app/_components/option-item'
import getOptionLabel from '@/app/_lib/get-option-label'
import { AnswersList } from '@/app/_lib/schema'

import styles from '@/app/_components/options-list.module.css'

type OptionsListProps = {
  answers: AnswersList
}

export default function OptionsList({ answers }: OptionsListProps) {
  return (
    <Form action={processAnswer} className={styles.options_group}>
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
