'use client';
import { MouseEventHandler } from 'react';

export default function Btn({
  type,
  title,
  handler,
  disabled,
  color,
}: {
  type?: 'button' | 'submit' | 'reset' | undefined;
  title: React.ReactNode;
  handler?: MouseEventHandler;
  disabled?: boolean;
  color?: 'cyan' | 'gray' | 'red';
}) {
  let colorClassName: string = '';
  switch (color) {
    case 'cyan':
      colorClassName = 'bg-cyan-500 border-cyan-500';
      break;
    case 'gray':
      colorClassName = 'bg-gray-400 border-gray-400';
      break;
    case 'red':
      colorClassName = 'bg-red-400 border-red-400';
      break;
    default:
      colorClassName = 'bg-blue-500 border-blue-500';
  }
  return (
    <button
      className={`lg:px-6 lg:py-3 px-3 py-1 ${colorClassName}`}
      type={type}
      onClick={handler}
      disabled={disabled}
    >
      {title}
    </button>
  );
}
