import { expect, vi, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import OptionsList from '../app/_components/options-list';

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
    })),
    useParams: vi.fn(() => ({ id: 1 })),
  };
});

vi.mock('react-dom', async () => {
  const actual = await vi.importActual('react-dom');
  return {
    ...actual,
    useFormStatus: vi.fn(() => ({ pending: false })),
  };
});

test('Options buttons', () => {
  const answers = [
    { id: 'A', title: 'option 1', isCorrect: true },
    { id: 'B', title: 'option 2', isCorrect: false },
  ];
  render(<OptionsList answers={answers} />);
  const buttons = screen.getAllByRole('button');
  expect(buttons).toHaveLength(2);
});
