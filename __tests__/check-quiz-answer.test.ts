import {
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import checkQuizAnswer from '@/app/_lib/check-quiz-answer';

vi.mock('@/app/_lib/get-quiz-data', async () => {
  const actual = await vi.importActual('@/app/_lib/get-quiz-data');
  return {
    ...actual,
    getQuizElement: vi.fn(() => Promise.resolve({
      step: 1,
      answers: [
        { id: '0', title: 'option 1', isCorrect: false },
        { id: '1', title: 'option 2', isCorrect: true },
      ],
    })),
  };
});

describe('checkQuizAnswer helper', () => {
  it('Should return correct answer', async () => {
    const step = '1';
    const answer = '1';

    const result = await checkQuizAnswer(step, answer);
    expect(result).toEqual(true);
  });

  it('Should return incorrect answer', async () => {
    let step = '1';
    let answer = '0';

    const result1 = await checkQuizAnswer(step, answer);
    expect(result1).toEqual(false);

    step = '123456789';
    answer = 'random string';
    const result2 = await checkQuizAnswer(step, answer);
    expect(result2).toEqual(false);
  });
});
