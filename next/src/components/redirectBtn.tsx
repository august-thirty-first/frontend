import Link from 'next/link';
import Btn from './btn';

export default function RedirectBtn({
  title,
  redirectUrl,
}: {
  title: React.ReactNode;
  redirectUrl: string;
}) {
  return (
    <Link href={redirectUrl}>
      <Btn title={title} />
    </Link>
  );
}
