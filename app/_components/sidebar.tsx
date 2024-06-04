'use client';

import classNames from 'classnames';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import BurgerButton from '@/app/_components/burger-button';
import ButtonCross from '@/app/_components/button-cross';
import ProgressItem from '@/app/_components/progress-item';
import { QuizList } from '@/app/_lib/schema';

import styles from '@/app/_components/sidebar.module.css';

type SidebarProps = {
  quizList: QuizList
};

export default function Sidebar({
  quizList,
}: SidebarProps) {
  const [isOpen, setOpen] = useState(false);
  const params = useParams();

  const toggleSidebar = () => {
    setOpen(!isOpen);
  };

  return (
    <>
      <BurgerButton toggleSidebar={toggleSidebar} />
      <div className={classNames(
        styles.container,
        isOpen && styles.container_is_open,
        !isOpen && styles.container_is_closed,
      )}
      >
        <div className={styles.wrapper}>
          <ButtonCross toggleSidebar={toggleSidebar} />
          {quizList.toReversed().map((quiz) => (
            <ProgressItem
              key={quiz.step}
              id={+params.id}
              reward={quiz.reward}
              step={quiz.step}
            />
          ))}
        </div>
      </div>
    </>
  );
}
