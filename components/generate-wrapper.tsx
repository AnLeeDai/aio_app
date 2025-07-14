interface GenerateWrapperProps {
  children: React.ReactNode;
}

export default function GenerateWrapper(props: GenerateWrapperProps) {
  const { children } = props;

  return (
    <div>
      <div className="flex flex-col gap-4 max-w-xs" />
      {children}
    </div>
  );
}
