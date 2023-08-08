'use client';
import { MouseEventHandler } from 'react';

export default function Btn({
  title,
  handler,
  type,
}: {
  title: React.ReactNode;
  handler?: MouseEventHandler;
  type?: 'button' | 'submit' | 'reset' | undefined;
}) {
  return (
    <button onClick={handler} type={type}>
      {title}
    </button>
  );
}
