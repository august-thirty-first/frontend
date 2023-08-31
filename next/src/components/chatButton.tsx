import { MouseEventHandler } from 'react';

export default function ChatBtn({
  type,
  title,
  handler,
  disabled,
  colorClass = 'bg-blue-500',
  widthClass = 'w-auto',
  heightClass = 'h-auto',
  textClass = 'text-white',
  textSizeClass = 'text-xs',
  textOverflowClass = 'overflow-hidden',
}: {
  type?: 'button' | 'submit' | 'reset' | undefined;
  title: React.ReactNode;
  handler?: MouseEventHandler;
  disabled?: boolean;
  colorClass?: string;
  widthClass?: string;
  heightClass?: string;
  textClass?: string;
  textSizeClass?: string;
  textOverflowClass?: string;
}) {
  return (
    <button
      className={`lg:px-6 lg:py-3 px-3 py-1 ${colorClass} ${widthClass} ${heightClass}`}
      type={type}
      onClick={handler}
      disabled={disabled}
    >
      <span
        className={`${textClass} ${textSizeClass} text-left flex items-center justify-center ${textOverflowClass}`}
      >
        {title}
      </span>
    </button>
  );
}
