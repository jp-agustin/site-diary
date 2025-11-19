interface DetailSectionProps {
  title: string;
  children: React.ReactNode;
}

const DetailSection: React.FC<DetailSectionProps> = ({ title, children }) => {
  return (
    <section
      className="space-y-2 rounded-md p-2"
      style={{ backgroundColor: 'var(--color-card)' }}
    >
      <h2
        className="text-lg font-semibold"
        style={{ color: 'var(--color-foreground)' }}
      >
        {title}
      </h2>

      <div
        className="text-sm"
        style={{ color: 'var(--color-card-foreground)' }}
      >
        {children}
      </div>
    </section>
  );
};

export default DetailSection;
