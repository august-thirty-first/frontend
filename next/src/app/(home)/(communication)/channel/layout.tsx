import childrenProps from '@/interfaces/childrenProps.interface';
import { Metadata } from 'next';
import RedirectBtn from '@/components/redirectBtn';
import RoomList from '@/app/(home)/(communication)/channel/roomList';

export const metadata: Metadata = {
  title: 'channel',
  description: '채팅 채널입니다.',
};

export default function ChannelLayout({ children }: childrenProps) {
  return (
    <div>
      <h1>Channel</h1>
      <div style={{ display: 'flex', gap: '200px' }}>
        <RoomList />
        <RedirectBtn title={'방 만들기'} redirectUrl={'/channel/create'} />
        {children}
      </div>
    </div>
  );
}
