import type { ReactNode } from 'react';

type PageContainerProps = {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
};

const maxWidthClasses: Record<NonNullable<PageContainerProps['maxWidth']>, string> = {
  sm: 'max-w-4xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-none',
};

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function PageContainer({
  children,
  className,
  maxWidth = 'xl',
}: PageContainerProps) {
  return (
    <div className="w-full">
      <div
        className={joinClasses(
          'mx-auto w-full px-4 py-4 sm:px-6 sm:py-6 lg:px-8',
          maxWidthClasses[maxWidth],
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
