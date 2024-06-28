import styles from '@/app/_components/confetti.module.css';

const MAX_24_BIT_COLOR = 16777215;

export default function Confetti() {
  return (
    <div className={styles.confetti}>
      {[...Array(400)].map(() => (
        <div
          // Math.random() is ok for key prop, as far as the context is Server Component
          key={Math.random()}
          className={styles.ball}
          style={{
            background: `#${Math.floor(Math.random() * MAX_24_BIT_COLOR).toString(16)}`,
            animationDuration: `${Math.random() * 9 + 2}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
}
