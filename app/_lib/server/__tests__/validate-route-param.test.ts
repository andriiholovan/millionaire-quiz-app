import { describe, expect, it } from 'vitest'
import { z } from 'zod'
import { validateRouteParam } from '../validate-route-param'

describe('validateRouteParam helper', () => {
  it('Should return a valid number param unchanged', () => {
    expect(validateRouteParam(1, z.number())).toBe(1)
  })

  it('Should coerce a string param to a number via z.coerce', () => {
    expect(validateRouteParam('1', z.coerce.number())).toBe(1)
  })

  it('Should throw a 404 error for an invalid param', () => {
    expect(() => validateRouteParam('abc', z.number())).toThrowError(
      'NEXT_HTTP_ERROR_FALLBACK;404',
    )
  })

  it('Should throw a 404 error when param is undefined', () => {
    expect(() => validateRouteParam(undefined, z.number())).toThrowError(
      'NEXT_HTTP_ERROR_FALLBACK;404',
    )
  })
})
