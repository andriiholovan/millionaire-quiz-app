import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import Button from '@/app/_components/button'

describe('BUTTON COMPONENT', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('Should match snapshot of <button> element with default props only', () => {
    const { asFragment } = render(<Button>Start</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  it('Should match snapshot of <a> element', () => {
    const { asFragment } = render(
      <Button push to="/">
        Start
      </Button>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('Should match snapshot of Button.Primary component', () => {
    const { asFragment } = render(
      <Button.Primary push to="/">
        Start
      </Button.Primary>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('Should match snapshot of Button.Icon component', () => {
    const { asFragment } = render(
      <Button.Icon
        iconAlt="Alt text"
        onClick={vi.fn()}
        src="/path/to/any/icon"
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('Should execute onClick handler in Button.Icon', () => {
    const mockFn = vi.fn()
    render(
      <Button.Icon
        iconAlt="Menu button"
        onClick={mockFn}
        src="/path/to/any/icon"
      />,
    )
    fireEvent.click(screen.getByRole('button'))
    expect(mockFn).toHaveBeenCalledOnce()
  })
})
