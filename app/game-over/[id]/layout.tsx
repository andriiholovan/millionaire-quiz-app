import '@/app/_styles/globals.css';
import Confetti from '@/app/_components/confetti';

export default function QuizLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Confetti />
      {children}
    </>
  );
}
