import childrenProps from '@/interfaces/childrenProps.interface';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'profile',
};

export default function ProfileLayout({ children }: childrenProps) {
  return <div>{children}</div>;
}
