import Link from 'next/link';

type LinkToProps = {
  children: React.ReactNode;
  className: string;
  href: string;
};

export default function LinkTo({
  children,
  className,
  href,
}: LinkToProps) {
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
