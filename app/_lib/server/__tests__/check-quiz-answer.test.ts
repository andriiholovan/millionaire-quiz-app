import { describe, expect, it, vi } from 'vitest'
import { checkQuizAnswer } from '../check-quiz-answer'

vi.mock('../get-quiz-data', async () => {
  const actual = await vi.importActual('../get-quiz-data')
  return {
    ...actual,
    getQuizElement: vi.fn(() =>
      Promise.resolve({
        step: 1,
        answers: [
          { id: '0', title: 'option 1', isCorrect: false },
          { id: '1', title: 'option 2', isCorrect: true },
        ],
      }),
    ),
  }
})

describe('checkQuizAnswer helper', () => {
  it('Should return true for the correct answer id', async () => {
    const result = await checkQuizAnswer(1, '1')
    expect(result).toBe(true)
  })

  it('Should return false for an incorrect answer id', async () => {
    const result = await checkQuizAnswer(1, '0')
    expect(result).toBe(false)
  })

  it('Should return false for a non-existent step', async () => {
    const result = await checkQuizAnswer(123456789, 'random string')
    expect(result).toBe(false)
  })

  it('Should return false when the answer id does not exist in the list', async () => {
    const result = await checkQuizAnswer(1, 'nonexistent')
    expect(result).toBe(false)
  })
})
