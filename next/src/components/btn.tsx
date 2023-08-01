'use client';
import { MouseEventHandler } from 'react';

export default function Btn({
  title,
  handler,
}: {
  title: React.ReactNode;
  handler?: MouseEventHandler;
}) {
  return <button onClick={handler}>{title}</button>;
}
