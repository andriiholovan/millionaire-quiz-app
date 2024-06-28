import classNames from 'classnames';
import Link from 'next/link';

import styles from '@/app/_components/button.module.css';

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>) => void;
  push?: boolean;
  to?: string;
};

type Component = 'button' | typeof Link;

export default function Button({
  children,
  className,
  onClick,
  push,
  to = '',
}: ButtonProps) {
  const Tag: Component = push ? Link : 'button';
  return (
    <Tag
      href={to ?? null}
      className={classNames(styles.button, className)}
      onClick={onClick}
      type={push ? undefined : 'button'}
    >
      {children}
    </Tag>
  );
}

export function ButtonPrimary({
  children,
  className,
  onClick,
  push,
  to,
}: ButtonProps) {
  return (
    <Button
      to={to}
      className={classNames(styles.button_primary, className)}
      onClick={onClick}
      push={push}
    >
      {children}
    </Button>
  );
}
