import { describe, expect, it } from 'vitest'
import z from 'zod'
import validateRouteParam from '@/app/_lib/validate-route-param'

describe('validateRouteParam helper', () => {
  it('Should return valid result', () => {
    const param = 1
    const schema = z.number()

    const result = validateRouteParam(param, schema)
    expect(result).toEqual(1)
  })

  it('Should return valid result with type coercion', () => {
    const param = '1'
    const schema = z.coerce.number()

    const result = validateRouteParam(param, schema)
    expect(result).toEqual(1)
  })

  it('Should throw error', () => {
    const param = 'abc'
    const schema = z.number()

    expect(() => validateRouteParam(param, schema)).toThrowError(
      'NEXT_HTTP_ERROR_FALLBACK;404',
    )
  })
})
