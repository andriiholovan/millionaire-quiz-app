'use client'

import cn from 'classnames'
import { ReactNode, useState } from 'react'
import { useFormStatus } from 'react-dom'

import styles from './option-item.module.css'

type OptionProps = {
  children: ReactNode
  className: string
  id: string
  isCorrect: boolean
}

export function OptionItem({
  children,
  className,
  id,
  isCorrect,
}: OptionProps) {
  const [isSelected, setSelected] = useState<boolean>(false)
  const { pending } = useFormStatus()
  return (
    <button
      className={cn(
        className,
        isSelected && isCorrect && styles.answer_correct,
        isSelected && !isCorrect && styles.answer_incorrect,
      )}
      disabled={pending}
      name="answer"
      type="submit"
      value={id}
      onClick={() => setSelected(true)}
    >
      {children}
    </button>
  )
}
