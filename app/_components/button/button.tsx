import cn from 'classnames'
import Link from 'next/link'
import { type MouseEvent, type PropsWithChildren } from 'react'

import styles from './button.module.css'

type ButtonProps = PropsWithChildren<{
  'aria-label'?: string
  className?: string
  isWide?: boolean
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
  push?: boolean
  to?: string
}>

export function Button({
  'aria-label': ariaLabel,
  children,
  className,
  isWide,
  onClick,
  push,
  to = '#',
}: ButtonProps) {
  const commonClassNames = cn(
    styles.button,
    isWide && styles.button_wide,
    className,
  )
  const sharedProps = {
    'aria-label': ariaLabel,
    className: commonClassNames,
    onClick,
  }
  return push ? (
    <Link {...sharedProps} prefetch href={to}>
      {children}
    </Link>
  ) : (
    <button {...sharedProps} type="button">
      {children}
    </button>
  )
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
      className={cn(styles.button_primary, className)}
      isWide={isWide}
      onClick={onClick}
      push={push}
      to={to}
    >
      {children}
    </Button>
  )
}

Button.Primary = ButtonPrimary

type ButtonIconProps = ButtonProps & {
  iconAlt: string
  isMobile?: boolean
  isRightAligned?: boolean
}

export function ButtonIcon({
  children,
  className,
  iconAlt,
  isMobile = true,
  isRightAligned = true,
  onClick,
  push,
  to,
}: ButtonIconProps) {
  return (
    <Button
      aria-label={iconAlt}
      className={cn(
        isMobile && styles.button_mobile,
        isRightAligned && styles.button_align_right,
        className,
      )}
      onClick={onClick}
      push={push}
      to={to}
    >
      <span className={styles.icon}>{children}</span>
    </Button>
  )
}

Button.Icon = ButtonIcon
