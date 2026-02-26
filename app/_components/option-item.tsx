'use client'

import classNames from 'classnames'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'

import styles from '@/app/_components/options-list.module.css'

type OptionProps = {
  children: React.ReactNode
  className: string
  id: string
  isCorrect: boolean
}

export default function OptionItem({
  children,
  className,
  id,
  isCorrect,
}: OptionProps) {
  const [isSelected, setSelected] = useState<boolean>(false)
  const { pending } = useFormStatus()
  return (
    <button
      className={classNames(
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
