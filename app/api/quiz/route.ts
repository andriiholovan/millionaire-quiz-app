import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import checkQuizAnswer from '@/app/_lib/check-quiz-answer';

// todo: nextjs restrictions error
//  could be fixed by adding new HTTP method handlers
// eslint-disable-next-line import/prefer-default-export
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const step = searchParams.get('step');
  const answer = searchParams.get('answer');

  if (!step || !answer) {
    return redirect('/');
  }

  const isCorrect = await checkQuizAnswer(step, answer);
  const currentStep = JSON.parse(step);
  if (!isCorrect) {
    return redirect(`/game-over/${currentStep}`);
  }
  redirect(`/quiz/${currentStep + 1}`);
}
