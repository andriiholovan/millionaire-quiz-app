import { cookies } from 'next/headers';

const ONE_HOUR: number = 60 * 60 * 1000;
export const STEP: string = 'step';

export function setCookie(key: string, value: string): void {
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
