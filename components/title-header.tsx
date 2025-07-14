interface TitleHeaderProps {
  title: string;
}

export default function TitleHeader({ title }: TitleHeaderProps) {
  return (
    <h1 className="text-5xl md:text-3xl font-bold mb-10 text-center">
      {title}
    </h1>
  );
}
