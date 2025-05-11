import React from 'react';

export default function Button({
  children,
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      {...rest}
      className={`rounded-md px-5 py-3 text-sm font-medium hover:opacity-70 ${className}`}
    >
      {children}
    </button>
  );
}
