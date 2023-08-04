import childrenProps from '@/interfaces/childrenProps.interface';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'channel',
  description: '채팅 채널입니다.',
};

export default function ChannelLayout({ children }: childrenProps) {
  return <div>{children}</div>;
}
