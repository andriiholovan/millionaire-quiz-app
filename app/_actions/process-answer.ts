'use server'

import {
  checkQuizAnswer,
  deleteCookie,
  getQuizList,
  setCookie,
  STEP,
  validateRouteParam,
} from '@lib/server'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import z from 'zod'

// Local helper instead of importing from `next/dist/...`, which is a private
// internal path with no stability guarantee across Next.js releases.
const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })

// The referer header is client-controlled and may be missing entirely
// (strict referrer policies, direct POSTs), so parse it defensively.
function getStepFromReferer(referer: string | null): string | undefined {
  if (!referer) {
    return undefined
  }
  try {
    return new URL(referer).pathname.split('/').at(-1)
  } catch {
    return undefined
  }
}

export async function processAnswer(formData: FormData) {
  const headersList = await headers()
  const step = getStepFromReferer(headersList.get('referer'))
  const answer = formData.get('answer') as string

  if (!step || !answer) {
    await deleteCookie(STEP)
    redirect('/')
  }

  const currentStep = validateRouteParam(step, z.coerce.number())

  // Authorize the submitted step against the trusted httpOnly cookie (the
  // source of truth the proxy also enforces), so a spoofed referer cannot
  // process an answer for an arbitrary step. Step 1 has no cookie yet.
  const cookieStep = (await cookies()).get(STEP)?.value
  if (currentStep !== 1 && String(currentStep) !== cookieStep) {
    await deleteCookie(STEP)
    redirect('/')
  }

  const prevStep = currentStep - 1
  const nextStep = currentStep + 1
  const quizList = await getQuizList()
  const lastQuizStep = quizList.at(-1)?.step
  const isLastStep = currentStep === lastQuizStep
  const isCorrect = await checkQuizAnswer(currentStep, answer)

  // delay the immediate transition to create some magic with animations
  await wait(2000)

  if (!isCorrect) {
    await deleteCookie(STEP)
    redirect(`/game-over/${prevStep}`)
  }

  if (isLastStep) {
    await deleteCookie(STEP)
    redirect(`/game-over/${currentStep}`)
  }

  await setCookie(STEP, nextStep)
  redirect(`/quiz/${currentStep + 1}`)
}
