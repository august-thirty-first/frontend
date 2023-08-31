'use client';
import { MouseEventHandler } from 'react';

export default function SmallBtn({
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
      className={`lg:px-3 lg:py-1.5 px-1.5 py-0.5 ${colorClassName} text-xs`}
      type={type}
      onClick={handler}
      disabled={disabled}
    >
      {title}
    </button>
  );
}
