type HeadingProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children: React.ReactNode
  className?: string
}

export default function Heading({ as, children, className }: HeadingProps) {
  const Tag = as ?? 'h1'
  return <Tag className={className}>{children}</Tag>
}
