import childrenProps from '@/interfaces/childrenProps.interface';
import { Metadata } from 'next';
import EnterRoom from './enterRoom';
import RedirectBtn from '@/components/redirectBtn';

export const metadata: Metadata = {
  title: 'channel',
  description: '채팅 채널입니다.',
};

export default function ChannelLayout({ children }: childrenProps) {
  return (
    <div>
      <h1>Channel</h1>
      <div style={{ display: 'flex', gap: '200px' }}>
        <EnterRoom />
        <RedirectBtn title={'방 만들기'} redirectUrl={'/channel/createRoom'} />
        {children}
      </div>
    </div>
  );
}
