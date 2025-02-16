import { notFound } from 'next/navigation';

type ForceErrorPageProps = {
  searchParams: Promise<{
    force: unknown;
  }>
};

export default async function ForceErrorPage(props: ForceErrorPageProps) {
  const searchParams = await props.searchParams;
  if ('force' in searchParams) {
    throw new Error('Go ahead and check the Global error page ui');
  }
  notFound();
}
