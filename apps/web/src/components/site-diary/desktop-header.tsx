interface DesktopHeaderProps {
  title: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
}

const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  title,
  subtitle,
  rightAction,
}) => {
  return (
    <div
      className="sticky top-0 z-40 border-b"
      style={{
        backgroundColor: 'var(--color-background)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div
        className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4"
        style={{
          borderRadius: 'var(--radius-lg)',
        }}
      >
        <div className="flex flex-col">
          <h1
            className="text-2xl font-semibold tracking-tight"
            style={{ color: 'var(--color-foreground)' }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className="mt-0.5 text-sm"
              style={{ color: 'var(--color-muted-foreground)' }}
            >
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {rightAction ? rightAction : null}
        </div>
      </div>
    </div>
  );
};

export default DesktopHeader;
