import Link from 'next/link';
import Btn from './btn';
import { MouseEventHandler } from 'react';

export default function RedirectBtn({
  title,
  redirectUrl,
  handler,
}: {
  title: React.ReactNode;
  redirectUrl: string;
  handler?: MouseEventHandler;
}) {
  return (
    <Link href={redirectUrl}>
      <Btn title={title} handler={handler} />
    </Link>
  );
}
