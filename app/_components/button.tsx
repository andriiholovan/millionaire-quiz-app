import Link from 'next/link';

import styles from '@/app/_components/button.module.css';

type ButtonProps = {
  children: React.ReactNode;
  push: boolean;
  to: string;
};

export default function Button({
  children,
  push = false,
  to,
}: ButtonProps) {
  const Tag = push ? Link : 'button';
  return (
    <Tag
      href={to ?? null}
      className={styles.button}
      type={push ? undefined : 'button'}
    >
      <span className={styles.button_title}>
        {children}
      </span>
    </Tag>
  );
}
