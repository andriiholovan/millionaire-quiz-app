import { notFound } from 'next/navigation';

type ForceErrorPageProps = {
  searchParams: {
    force: unknown;
  }
};

export default function ForceErrorPage({
  searchParams,
}: ForceErrorPageProps) {
  if ('force' in searchParams) {
    throw new Error('Go ahead and check the Global error page ui');
  }
  notFound();
}
