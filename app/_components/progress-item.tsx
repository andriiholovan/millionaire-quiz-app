import classNames from 'classnames';
import React from 'react';

import styles from '@/app/_components/progress-item.module.css';

type ProgressItemProps = {
  id: number;
  reward: string;
  step: number;
};

export default function ProgressItem({
  id,
  reward,
  step,
}: ProgressItemProps) {
  return (
    <div
      key={step}
      className={classNames(
        styles.progress,
        id === step && styles.progress_current,
        id > step && styles.progress_previous,
        id < step && styles.progress_next,
      )}
    >
      <span className={styles.progress_title}>
        {reward}
      </span>
    </div>
  );
}
