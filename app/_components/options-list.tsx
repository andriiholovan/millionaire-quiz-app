'use client';

import classNames from 'classnames';
import { wait } from 'next/dist/lib/wait';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import Option from '@/app/_components/option';
import { AnswerElement, AnswersList } from '@/app/_lib/schema';
import getOptionLabel from '@/app/_lib/getOptionLabel';

import styles from '@/app/_components/options-list.module.css';

type OptionsListProps = {
  answers: AnswersList;
};

export default function OptionsList({
  answers,
}: OptionsListProps) {
  const [selected, setSelected] = React.useState<string>('');
  const params = useParams();
  const router = useRouter();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    if (selected) return;
    const answerId = e.currentTarget.dataset.id as AnswerElement['id'];

    // delay magic with animations
    await wait(500);
    setSelected(answerId);
    await wait(2000);

    const { url } = await fetch(`/api/quiz?step=${params.id}&answer=${answerId}`);
    router.push(url);
  };

  return (
    <div className={styles.options_group}>
      {answers.map((answer) => {
        const label = getOptionLabel(answer.id);
        const isSelected = answer.id === selected;
        const { isCorrect = false } = answers[+selected];
        return (
          <Option
            key={answer.id}
            id={answer.id}
            className={classNames(
              styles.answer,
              isSelected && !isCorrect && styles.answer_incorrect,
              isSelected && isCorrect && styles.answer_correct,
            )}
            handleClick={handleClick}
          >
            <span className={styles.answer_label}>
              {label}
            </span>
            <span className={styles.answer_title}>
              {answer.title}
            </span>
          </Option>
        );
      })}
    </div>
  );
}
