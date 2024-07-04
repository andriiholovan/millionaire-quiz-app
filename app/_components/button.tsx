import classNames from 'classnames';
import Link from 'next/link';

import styles from '@/app/_components/button.module.css';

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  isWide?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  push?: boolean;
  to?: string;
};

type Component = 'button' | typeof Link;

export default function Button({
  children,
  className,
  isWide,
  onClick,
  push,
  to = '',
}: ButtonProps) {
  const Tag: Component = push ? Link : 'button';
  return (
    <Tag
      className={classNames(
        styles.button,
        isWide && styles.button_wide,
        className,
      )}
      href={to ?? null}
      onClick={onClick}
      prefetch={push}
      type={push ? undefined : 'button'}
    >
      {children}
    </Tag>
  );
}

export function ButtonPrimary({
  children,
  className,
  isWide = true,
  onClick,
  push,
  to,
}: ButtonProps) {
  return (
    <Button
      isWide={isWide}
      className={classNames(styles.button_primary, className)}
      onClick={onClick}
      push={push}
      to={to}
    >
      {children}
    </Button>
  );
}
