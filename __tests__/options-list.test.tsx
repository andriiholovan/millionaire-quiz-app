import {
  cleanup,
  render,
  type RenderResult,
  screen,
} from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import OptionsList from '@/app/_components/options-list'

vi.mock('react-dom', async () => {
  const actual = await vi.importActual('react-dom')
  return {
    ...actual,
    useFormStatus: vi.fn(() => ({ pending: false })),
  }
})

vi.mock('@/app/_actions/process-answer', () => ({
  __esModule: true,
  default: 'process-answer',
}))

describe('OPTION LIST', () => {
  let container: RenderResult
  const answers = [
    { id: 'A', title: 'option 1', isCorrect: true },
    { id: 'B', title: 'option 2', isCorrect: false },
  ]

  beforeEach(() => {
    container = render(<OptionsList answers={answers} />)
  })

  afterEach(cleanup)

  it('Should match snapshot', () => {
    expect(container.asFragment()).toMatchSnapshot()
  })

  it('Should render list of option buttons', () => {
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2)
  })
})
