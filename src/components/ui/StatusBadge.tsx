import type { ReactNode } from 'react';

type StatusVariant = 'success' | 'warning' | 'danger' | 'neutral' | 'info';

type StatusBadgeProps = {
  variant?: StatusVariant;
  children: ReactNode;
  className?: string;
};

const variantClasses: Record<StatusVariant, string> = {
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  warning: 'bg-amber-50 text-amber-800 ring-amber-600/20',
  danger: 'bg-rose-50 text-rose-700 ring-rose-600/20',
  neutral: 'bg-slate-100 text-slate-700 ring-slate-600/10',
  info: 'bg-sky-50 text-sky-700 ring-sky-600/20',
};

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function StatusBadge({
  variant = 'neutral',
  children,
  className,
}: StatusBadgeProps) {
  return (
    <span
      className={joinClasses(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
