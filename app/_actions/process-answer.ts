'use server'

import {
  advanceSession,
  checkQuizAnswer,
  clearSessionCookie,
  createSession,
  endSession,
  getActiveSession,
  getQuizList,
  validateRouteParam,
} from '@lib/server'
import { headers } from 'next/headers'
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
    await clearSessionCookie()
    redirect('/')
  }

  const currentStep = validateRouteParam(step, z.coerce.number())

  // For step 1, there is no active session yet — create one now.
  // For all subsequent steps, look up the existing session and verify the
  // submitted step matches the DB-authoritative current_step.
  let sessionId: string
  if (currentStep === 1) {
    sessionId = await createSession()
  } else {
    const session = await getActiveSession()
    if (!session || session.currentStep !== currentStep) {
      await clearSessionCookie()
      redirect('/')
    }
    sessionId = session.sessionId
  }

  const prevStep = currentStep - 1
  const nextStep = currentStep + 1
  const quizList = await getQuizList()
  const lastQuizStep = quizList.at(-1)?.step
  const isLastStep = currentStep === lastQuizStep
  const isCorrect = await checkQuizAnswer(currentStep, answer)

  // Delay the immediate transition to create some magic with animations.
  await wait(2000)

  if (!isCorrect) {
    await endSession(sessionId, 'lost')
    redirect(`/game-over/${prevStep}`)
  }

  if (isLastStep) {
    await endSession(sessionId, 'won')
    redirect(`/game-over/${currentStep}`)
  }

  await advanceSession(sessionId, nextStep)
  redirect(`/quiz/${nextStep}`)
}
