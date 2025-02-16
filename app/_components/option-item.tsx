import { useFormStatus } from 'react-dom';

type OptionProps = {
  id: string;
  children: React.ReactNode;
  className: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function OptionItem({
  id,
  className,
  children,
  onClick,
}: OptionProps) {
  const { pending } = useFormStatus();
  return (
    <button
      name="answer"
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
