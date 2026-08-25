import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { OptionList } from './option-list'

const mockUseFormStatus = vi.hoisted(() => vi.fn())

vi.mock('@actions', () => ({
  processAnswer: 'process-answer',
}))

vi.mock('react-dom', () => ({
  useFormStatus: mockUseFormStatus,
}))

const answers = [
  { id: '0', title: 'option 1', isCorrect: true },
  { id: '1', title: 'option 2', isCorrect: false },
]

const defaultFormStatus = {
  pending: false,
  data: null,
  method: 'post',
  action: null,
}

describe('OPTION LIST', () => {
  afterEach(cleanup)

  beforeEach(() => {
    mockUseFormStatus.mockReturnValue(defaultFormStatus)
  })

  it('Should render the correct number of option buttons', () => {
    render(<OptionList answers={answers} />)
    expect(screen.getAllByRole('button')).toHaveLength(answers.length)
  })

  it('Should render option labels in order (A, B, ...)', () => {
    render(<OptionList answers={answers} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons[0].textContent).toContain('A')
    expect(buttons[1].textContent).toContain('B')
  })
})

describe('OPTION LIST — pending state', () => {
  afterEach(cleanup)

  it('Should disable all buttons while form is pending', () => {
    mockUseFormStatus.mockReturnValue({
      ...defaultFormStatus,
      pending: true,
    })

    render(<OptionList answers={answers} />)
    const buttons = screen.getAllByRole('button')
    buttons.forEach((btn) => {
      expect((btn as HTMLButtonElement).disabled).toBe(true)
    })
  })
})
