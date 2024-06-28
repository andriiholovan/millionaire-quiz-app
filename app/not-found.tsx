import { ButtonPrimary } from '@/app/_components/button';
import HandIcon from '@/app/_components/hand-icon';
import Heading from '@/app/_components/heading';

import styles from '@/app/not-found.module.css';

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
        <p className={styles.description}>
          Could not find requested resource.
        </p>
        <ButtonPrimary push to="/">
          Return Home
        </ButtonPrimary>
      </div>
    </main>
  );
}
