import childrenProps from '@/interfaces/childrenProps.interface';
import { Metadata } from 'next';
import ChatRoomList from '@/app/(home)/(communication)/channel/_room/chatRoomList';
import RoomBuilder from '@/app/(home)/(communication)/channel/_room/roomBuilder';
import MyChatRoomList from '@/app/(home)/(communication)/channel/_room/myChatRoomList';

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
        <MyChatRoomList />
        <RoomBuilder title={'방 생성'} method={'POST'} url={'chat'} />
        {children}
      </div>
    </div>
  );
}
