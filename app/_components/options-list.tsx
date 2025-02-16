'use client';

import classNames from 'classnames';
import Form from 'next/form';
import { useState } from 'react';
import processAnswer from '@/app/_actions/process-answer';
import OptionItem from '@/app/_components/option-item';
import getOptionLabel from '@/app/_lib/get-option-label';
import { AnswersList } from '@/app/_lib/schema';

import styles from '@/app/_components/options-list.module.css';

type OptionsListProps = {
  answers: AnswersList;
};

export default function OptionsList({
  answers,
}: OptionsListProps) {
  const [selected, setSelected] = useState<string>('');

  const onSubmitClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setSelected(event.currentTarget.value);
  };

  return (
    <Form action={processAnswer} className={styles.options_group}>
      {answers.map((answer) => {
        const label = getOptionLabel(answer.id);
        const isSelected = answer.id === selected;
        const { isCorrect = false } = answers[+selected];
        return (
          <OptionItem
            key={answer.id}
            id={answer.id}
            className={classNames(
              styles.answer,
              isSelected && !isCorrect && styles.answer_incorrect,
              isSelected && isCorrect && styles.answer_correct,
            )}
            onClick={onSubmitClick}
          >
            <span className={styles.answer_label}>
              {label}
            </span>
            <span className={styles.answer_title}>
              {answer.title}
            </span>
          </OptionItem>
        );
      })}
    </Form>
  );
}
