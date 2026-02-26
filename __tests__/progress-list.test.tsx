import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, render, RenderResult, screen } from '@testing-library/react'
import ProgressList from '@/app/_components/progress-list'

describe('PROGRESS LIST', () => {
  let container: RenderResult
  const paramsId = 1
  const quizList = [
    { step: 1, reward: '500' },
    { step: 2, reward: '64,000' },
    { step: 3, reward: '1,000,000' },
  ]

  beforeEach(() => {
    container = render(<ProgressList id={paramsId} quizList={quizList} />)
  })

  afterEach(cleanup)

  it('Should match snapshot', () => {
    expect(container.asFragment()).toMatchSnapshot()
  })

  it('Should render list of progress items', () => {
    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(3)
  })
})
