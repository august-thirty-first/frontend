import childrenProps from '@/interfaces/childrenProps.interface';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ladder',
};

export default function LadderLayout({ children }: childrenProps) {
  return <div>{children}</div>;
}
