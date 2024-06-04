'use client';

import { useEffect } from 'react';
import { z } from 'zod';

import styles from '@/app/error.module.css';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error instanceof z.ZodError ? error.format() : error);
  }, [error]);

  return (
    <main className={styles.error}>
      <h2 className={styles.heading}>
        Something went wrong!
      </h2>
      <div className={styles.button_group}>
        <button
          className={classNames(styles.button, styles.try_again)}
          onClick={() => reset()}
          type="button"
        >
          Try again
        </button>
        <button
          className={classNames(styles.button, styles.start_over)}
          onClick={() => router.push('/')}
          type="button"
        >
          Start over
        </button>
      </div>
    </main>
  );
}
