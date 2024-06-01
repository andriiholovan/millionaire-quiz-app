'use client';

// todo fix that
/* eslint-disable no-nested-ternary */
import { wait } from 'next/dist/lib/wait';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import styles from '@/app/_components/option.module.css';

type OptionProps = {
  title: string;
  option: string;
  isCorrect: boolean;
};

type OptionState = 'unset' | 'correct' | 'incorrect';

export default function Option({
  title,
  option,
  isCorrect,
}: OptionProps) {
  const [selected, setSelected] = React.useState<OptionState>('unset');
  const router = useRouter();
  const { id } = useParams();

  const handleClick = async (): Promise<void> => {
    await wait(500);
    setSelected(isCorrect ? 'correct' : 'incorrect');
    await wait(2000);
    const nextStep = Number(id) + 1;
    router.push(isCorrect ? `/quiz/${nextStep}` : '/');
    localStorage?.setItem?.('step', JSON.stringify(nextStep));
  };

  return (
    <button
      className={`
        ${styles.answer}
        ${selected === 'unset' ? styles.answer_inactive : selected === 'correct' ? styles.answer_correct : styles.answer_incorrect}
      `}
      onClick={handleClick}
      type="button"
    >
      <span className={styles.answer_title}>{title}</span>
      <span className={styles.answer_description}>{option}</span>
    </button>
  );
}
