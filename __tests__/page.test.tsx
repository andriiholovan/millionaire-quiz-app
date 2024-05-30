import { expect, test } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Page from '../app/page';

test('Home page heading', () => {
  render(<Page />);
  const main = within(screen.getByRole('main'));
  expect(
    main.getByRole('heading', { level: 1, name: /Who wants to be a millionaire?/i }),
  ).toBeDefined();
});
