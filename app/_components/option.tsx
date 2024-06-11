import { useFormStatus } from 'react-dom';

type OptionProps = {
  id: string;
  className: string;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Option({
  id,
  className,
  children,
  onClick,
}: OptionProps) {
  const { pending } = useFormStatus();
  return (
    <button
      name="id"
      value={id}
      className={className}
      disabled={pending}
      onClick={onClick}
      type="submit"
    >
      {children}
    </button>
  );
}
