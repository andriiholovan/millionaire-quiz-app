'use server'

import {
  checkQuizAnswer,
  deleteCookie,
  getQuizList,
  setCookie,
  STEP,
  validateRouteParam,
} from '@lib/server'
import { wait } from 'next/dist/lib/wait'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export async function processAnswer(formData: FormData) {
  const headersList = await headers()
  const referer = headersList.get('referer') as string
  const step = new URL(referer).pathname.split('/').at(-1)
  const answer = formData.get('answer') as string

  if (!step || !answer) {
    await deleteCookie(STEP)
    redirect('/')
  }

  const currentStep = validateRouteParam(step, z.coerce.number())
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
