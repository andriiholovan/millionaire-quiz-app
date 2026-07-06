'use client'

import { Button } from '@components'
import cn from 'classnames'
import { useEffect } from 'react'
import z from 'zod'

import styles from './error.module.css'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error instanceof z.ZodError ? error.format() : error)
  }, [error])

  return (
    <main className={styles.main}>
      <h2 className={styles.heading}>Something went wrong!</h2>
      <div className={styles.button_group}>
        <Button
          isWide
          className={cn(styles.button, styles.try_again)}
          onClick={() => reset()}
        >
          Try again
        </Button>
        <Button
          isWide
          push
          to="/"
          className={cn(styles.button, styles.start_over)}
        >
          Start over
        </Button>
      </div>
    </main>
  )
}
