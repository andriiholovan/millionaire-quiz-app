import cn from 'classnames'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'

import styles from './button.module.css'

type ButtonProps = {
  children: React.ReactNode
  className?: string
  isWide?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
  push?: boolean
  to?: string
}

export function Button({
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
  return push ? (
    <Link prefetch className={commonClassNames} href={to} onClick={onClick}>
      {children}
    </Link>
  ) : (
    <button className={commonClassNames} onClick={onClick} type="button">
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
      isWide={isWide}
      className={cn(styles.button_primary, className)}
      onClick={onClick}
      push={push}
      to={to}
    >
      {children}
    </Button>
  )
}

Button.Primary = ButtonPrimary

type ButtonIconProps = Omit<ButtonProps, 'children'> & {
  iconAlt: string
  isMobile?: boolean
  isRightAligned?: boolean
  src: ImageProps['src']
}

export function ButtonIcon({
  className,
  iconAlt,
  isMobile = true,
  isRightAligned = true,
  onClick,
  src,
  push,
  to,
}: ButtonIconProps) {
  return (
    <Button
      className={cn(
        isMobile && styles.button_mobile,
        isRightAligned && styles.button_align_right,
        className,
      )}
      onClick={onClick}
      push={push}
      to={to}
    >
      <Image priority src={src} alt={iconAlt} height={24} width={24} />
    </Button>
  )
}

Button.Icon = ButtonIcon
