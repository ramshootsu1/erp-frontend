import { useEffect, useId, useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  onDebouncedChange?: (value: string) => void;
  label?: string;
  ariaLabel?: string;
  clearLabel?: string;
  className?: string;
};

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  debounceMs = 250,
  onDebouncedChange,
  label = 'Search',
  ariaLabel,
  clearLabel = 'Clear search',
  className,
}: SearchInputProps) {
  const inputId = useId();
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (!onDebouncedChange) return;

    const timer = window.setTimeout(() => {
      onDebouncedChange(localValue);
    }, debounceMs);

    return () => window.clearTimeout(timer);
  }, [debounceMs, localValue, onDebouncedChange]);

  const handleChange = (nextValue: string) => {
    setLocalValue(nextValue);
    onChange(nextValue);
  };

  const handleClear = () => {
    handleChange('');
  };

  return (
    <div className={joinClasses('w-full', className)}>
      <label htmlFor={inputId} className="sr-only">
        {ariaLabel ?? label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
          <MagnifyingGlassIcon className="h-4 w-4" aria-hidden="true" />
        </span>
        <input
          id={inputId}
          type="search"
          value={localValue}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          aria-label={ariaLabel ?? label}
          className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-9 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        />
        {localValue ? (
          <button
            type="button"
            onClick={handleClear}
            aria-label={clearLabel}
            className="absolute inset-y-0 right-1 my-1 inline-flex items-center rounded-md px-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          >
            <XMarkIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
