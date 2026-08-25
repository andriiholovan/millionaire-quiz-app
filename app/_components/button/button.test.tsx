import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Button } from './button'

describe('BUTTON COMPONENT', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  describe('Button', () => {
    it('Should render as a <button> element by default', () => {
      const { asFragment } = render(<Button>Start</Button>)
      expect(screen.getByRole('button')).toBeDefined()
      expect(asFragment()).toMatchSnapshot()
    })

    it('Should render as an <a> element when push prop is set', () => {
      render(
        <Button push to="/">
          Start
        </Button>,
      )
      expect(screen.getByRole('link', { name: 'Start' })).toBeDefined()
    })

    it('Should call onClick handler when clicked', () => {
      const mockFn = vi.fn()
      render(<Button onClick={mockFn}>Click me</Button>)
      fireEvent.click(screen.getByRole('button'))
      expect(mockFn).toHaveBeenCalledOnce()
    })
  })

  describe('Button.Icon', () => {
    it('Should render with aria-label on the button wrapper', () => {
      render(
        <Button.Icon iconAlt="Menu button">
          <svg aria-hidden="true" />
        </Button.Icon>,
      )
      expect(screen.getByRole('button', { name: 'Menu button' })).toBeDefined()
    })

    it('Should call onClick handler when clicked', () => {
      const mockFn = vi.fn()
      render(
        <Button.Icon iconAlt="Close button" onClick={mockFn}>
          <svg aria-hidden="true" />
        </Button.Icon>,
      )
      fireEvent.click(screen.getByRole('button'))
      expect(mockFn).toHaveBeenCalledOnce()
    })
  })
})
