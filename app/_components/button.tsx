import classNames from 'classnames';
import Link from 'next/link';

import styles from '@/app/_components/button.module.css';

type ButtonProps = {
  children: React.ReactNode;
  className: string;
  href: string;
  isPrimary: boolean;
};

export default function Button({
  children,
  className,
  href,
  isPrimary,
}: ButtonProps) {
  const Tag = href ? Link : 'button';
  return (
    <Tag
      href={href ?? null}
      className={classNames(
        className,
        isPrimary && styles.button,
      )}
      type={href ? undefined : 'button'}
    >
      {children}
    </Tag>
  );
}
