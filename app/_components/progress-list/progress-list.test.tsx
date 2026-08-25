import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { ProgressList } from './progress-list'

const quizList = [
  { step: 1, reward: '500' },
  { step: 2, reward: '64,000' },
  { step: 3, reward: '1,000,000' },
]

describe('PROGRESS LIST', () => {
  afterEach(cleanup)

  it('Should render the correct number of list items', () => {
    render(<ProgressList id={1} quizList={quizList} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(quizList.length)
  })

  it('Should render reward labels for each step', () => {
    render(<ProgressList id={1} quizList={quizList} />)
    const rewards = screen.getAllByText(/\d+,*\d+/u)
    expect(rewards).toHaveLength(quizList.length)
  })

  it('Should mark the active step differently from others', () => {
    render(<ProgressList id={1} quizList={quizList} />)
    const items = screen.getAllByRole('listitem')
    expect(items[0].className).toContain('_progress_current_')
    expect(items[1].className).toContain('_progress_next_')
  })
})
