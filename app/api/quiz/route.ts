import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import checkQuizAnswer from '@/app/_lib/check-quiz-answer';
import { getQuizList } from '@/app/_lib/get-quiz-data';

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
  const currentStep = JSON.parse(step);
  const quizList = await getQuizList();
  const lastQuizStep = quizList.at(-1)?.step;

  const isCorrect = await checkQuizAnswer(step, answer);

  if (isCorrect && currentStep === lastQuizStep) {
    redirect(`/game-over/${currentStep}`);
  }
  if (!isCorrect) {
    redirect(`/game-over/${currentStep - 1}`);
  }
  redirect(`/quiz/${currentStep + 1}`);
}
