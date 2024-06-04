type OptionProps = {
  id: string;
  className: string;
  children: React.ReactNode;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Option({
  id,
  className,
  children,
  handleClick,
}: OptionProps) {
  return (
    <button
      data-id={id}
      className={className}
      onClick={handleClick}
      type="button"
    >
      {children}
    </button>
  );
}
