import {
  afterEach,
  describe,
  expect,
  it,
} from 'vitest';
import {
  cleanup,
  render,
} from '@testing-library/react';
import Heading from '../app/_components/heading';

describe('HEADING COMPONENT', () => {
  afterEach(cleanup);

  it('Should match snapshot of component with h1 tag', () => {
    const { asFragment: asFragmentWithDefaultProps } = render(
      <Heading>Who wants to be a millionaire?</Heading>,
    );
    expect(asFragmentWithDefaultProps()).toMatchSnapshot();

    const { asFragment } = render(
      <Heading as="h1">Who wants to be a millionaire?</Heading>,
    );
    expect(asFragment()).toEqual(asFragmentWithDefaultProps());
  });

  it('Should match snapshot of component with h2 tag', () => {
    const { asFragment } = render(
      <Heading
        as="h2"
        className="heading className here"
      >
        Who wants to be a millionaire?
      </Heading>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
