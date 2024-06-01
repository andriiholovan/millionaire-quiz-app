import Link from 'next/link';
import styles from '@/app/_components/link.module.css';

type LinkToProps = {
  children: React.ReactNode;
  href: string;
};

export default function LinkTo({
  children,
  href,
}: LinkToProps) {
  return (
    <Link href={href} className={styles.link}>
      {children}
    </Link>
  );
}
