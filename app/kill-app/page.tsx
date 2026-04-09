import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type ForceErrorPageProps = {
  searchParams: Promise<{
    force: unknown
  }>
}

export const metadata: Metadata = {
  title: 'Oops, something went wrong',
}

export default async function ForceErrorPage(props: ForceErrorPageProps) {
  const searchParams = await props.searchParams
  if ('force' in searchParams) {
    throw new Error('Go ahead and check the Global error page ui')
  }
  notFound()
}
