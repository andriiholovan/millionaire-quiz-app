import { Button, HandIcon, Heading } from '@components'
import type { Metadata } from 'next'

import styles from './not-found.module.css'

export const metadata: Metadata = {
  title: 'Not Found',
}

export default function NotFound() {
  return (
    <main className={styles.main}>
      <div className={styles.logo_container}>
        <HandIcon />
      </div>
      <div className={styles.content_container}>
        <Heading as="h2" className={styles.heading}>
          Not Found
        </Heading>
        <p className={styles.description}>Could not find requested resource</p>
        <Button.Primary push to="/">
          Return Home
        </Button.Primary>
      </div>
    </main>
  )
}
