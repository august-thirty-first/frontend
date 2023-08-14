import childrenProps from '@/interfaces/childrenProps.interface';
import { Metadata } from 'next';
import RedirectBtn from '@/components/redirectBtn';
import ChatRoomList from '@/app/(home)/(communication)/channel/_list/chatRoomList';
import RoomCreate from '@/app/(home)/(communication)/channel/roomCreate';

export const metadata: Metadata = {
  title: 'channel',
  description: '채팅 채널입니다.',
};

export default function ChannelLayout({ children }: childrenProps) {
  return (
    <div>
      <h1>Channel</h1>
      <div style={{ display: 'flex', gap: '200px' }}>
        <ChatRoomList />
        <RoomCreate />
        {children}
      </div>
    </div>
  );
}
