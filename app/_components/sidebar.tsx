'use client';

import classNames from 'classnames';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Button from '@/app/_components/button';
import ProgressItem from '@/app/_components/progress-item';
import { QuizList } from '@/app/_lib/schema';
import BurgerIcon from '@/public/burger.svg';
import CrossIcon from '@/public/cross.svg';

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
      <nav className={styles.nav}>
        <Button.Icon
          iconAlt="Menu button"
          onClick={toggleSidebar}
          src={BurgerIcon}
        />
      </nav>
      <div className={classNames(
        styles.container,
        isOpen && styles.container_is_open,
        !isOpen && styles.container_is_closed,
      )}
      >
        <Button.Icon
          iconAlt="Close button"
          onClick={toggleSidebar}
          src={CrossIcon}
        />
        <div className={styles.progress_group}>
          {quizList.map((quiz) => (
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
