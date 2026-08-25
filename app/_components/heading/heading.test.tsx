import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { Heading } from './heading'

describe('HEADING COMPONENT', () => {
  afterEach(cleanup)

  it('Should render as h1 by default', () => {
    render(<Heading>Who wants to be a millionaire?</Heading>)
    expect(screen.getByRole('heading', { level: 1 })).toBeDefined()
  })

  it.each(['h2', 'h3', 'h4', 'h5', 'h6'] as const)(
    'Should render as %s tag',
    (tag) => {
      const level = Number(tag.slice(1))
      render(<Heading as={tag}>Question</Heading>)
      expect(screen.getByRole('heading', { level })).toBeDefined()
    },
  )
})
