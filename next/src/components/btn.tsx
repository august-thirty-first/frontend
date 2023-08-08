'use client';
import { MouseEventHandler } from 'react';

export default function Btn({
  type,
  title,
  handler,
}: {
  type?: 'button' | 'submit' | 'reset' | undefined;
  title: React.ReactNode;
  handler?: MouseEventHandler;
}) {
  return (
    <button type={type} onClick={handler}>
      {title}
    </button>
  );
}
