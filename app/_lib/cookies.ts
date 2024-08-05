import { cookies } from 'next/headers';

const ONE_HOUR = 3_600_000; // one-hour period
export const STEP = 'millionaire-quiz-step';

export function setCookie(key: string, value: number): void {
  cookies()
    .set(
      key,
      JSON.stringify(value),
      {
        expires: Date.now() + ONE_HOUR,
        httpOnly: true,
      },
    );
}

export function deleteCookie(key: string): void {
  cookies().delete(key);
}
