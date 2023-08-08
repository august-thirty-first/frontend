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
    <button type={type} onClick={handler} disabled={disabled}>
      {title}
    </button>
  );
}
