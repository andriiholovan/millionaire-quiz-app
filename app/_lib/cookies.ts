import { cookies } from 'next/headers'

const ONE_HOUR = 3_600_000 // one-hour period
export const STEP = 'millionaire-quiz-step'

export async function setCookie(key: string, value: number): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(key, JSON.stringify(value), {
    expires: Date.now() + ONE_HOUR,
    httpOnly: true,
  })
}

export async function deleteCookie(key: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(key)
}
