type LoadingStateProps = {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const spinnerSizes: Record<NonNullable<LoadingStateProps['size']>, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-8 w-8 border-[3px]',
};

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function LoadingState({
  message = 'Loading...',
  size = 'md',
  className,
}: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={joinClasses(
        'flex min-h-[160px] items-center justify-center rounded-lg bg-white px-4 py-8 text-slate-600',
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className={joinClasses(
            'animate-spin rounded-full border-slate-300 border-t-indigo-600',
            spinnerSizes[size],
          )}
        />
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
}
