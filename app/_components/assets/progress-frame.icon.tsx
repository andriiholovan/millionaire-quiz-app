import cn from 'classnames'

type ProgressFrameProps = {
  classNames?: {
    base?: string
    desktop?: string
    mobile?: string
  }
}

export function ProgressFrame({ classNames }: ProgressFrameProps) {
  return (
    <>
      <svg
        aria-hidden="true"
        className={cn(classNames?.base, classNames?.mobile)}
        viewBox="0 0 320 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 16H41 M279 16H320 M53.5303 3.70404C55.6719 1.64809 58.5256 0.5 61.4944 0.5H258.506C261.474 0.5 264.328 1.64809 266.47 3.70404L279.278 16L266.47 28.296C264.328 30.3519 261.474 31.5 258.506 31.5H61.4944C58.5256 31.5 55.6719 30.3519 53.5303 28.296L40.722 16L53.5303 3.70404Z" />
      </svg>
      <svg
        aria-hidden="true"
        className={cn(classNames?.base, classNames?.desktop)}
        viewBox="0 0 376 40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 20H69 M307 20H376 M81.4526 4.63788C83.6376 2.01596 86.8742 0.5 90.2872 0.5H285.713C289.126 0.5 292.362 2.01597 294.547 4.63788L307.349 20L294.547 35.3621C292.362 37.984 289.126 39.5 285.713 39.5H90.2872C86.8742 39.5 83.6376 37.984 81.4526 35.3621L68.6509 20L81.4526 4.63788Z" />
      </svg>
    </>
  )
}
