import cn from 'classnames'

type OptionFrameProps = {
  classNames?: {
    base?: string
    desktop?: string
    mobile?: string
  }
}

export function OptionFrame({ classNames }: OptionFrameProps) {
  return (
    <>
      <svg
        aria-hidden="true"
        className={cn(classNames?.base, classNames?.mobile)}
        viewBox="0 0 320 56"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 28H17 M303 28H320 M32.8175 5.31576C34.9762 2.29361 38.4615 0.5 42.1754 0.5H277.825C281.539 0.5 285.024 2.29361 287.183 5.31576L303.386 28L287.183 50.6842C285.024 53.7064 281.539 55.5 277.825 55.5H42.1754C38.4615 55.5 34.9762 53.7064 32.8175 50.6842L16.6145 28L32.8175 5.31576Z" />
      </svg>
      <svg
        aria-hidden="true"
        className={cn(classNames?.base, classNames?.mobile)}
        viewBox="0 0 405 72"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 36H17 M388 36H405 M38.7172 5.28344C40.8781 2.28016 44.3521 0.5 48.052 0.5H356.948C360.648 0.5 364.122 2.28016 366.283 5.28344L388.384 36L366.283 66.7166C364.122 69.7198 360.648 71.5 356.948 71.5H48.052C44.3521 71.5 40.8781 69.7198 38.7172 66.7166L16.616 36L38.7172 5.28344Z" />
      </svg>
    </>
  )
}
