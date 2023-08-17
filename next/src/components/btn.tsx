'use client';
import { MouseEventHandler } from 'react';

export default function Btn({
  type,
  title,
  handler,
  disabled,
}: {
  type?: 'button' | 'submit' | 'reset' | undefined;
  title: React.ReactNode;
  handler?: MouseEventHandler;
  disabled?: boolean;
}) {
  return (
    <button
      className="lg:px-6 lg:py-3 px-3 py-1 bg-blue-500"
      type={type}
      onClick={handler}
      disabled={disabled}
    >
      {title}
    </button>
  );
}
