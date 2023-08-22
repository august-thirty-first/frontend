import childrenProps from '@/interfaces/childrenProps.interface';
import { Metadata } from 'next';
import AllRoomList from '@/app/(home)/(communication)/channel/_room/allRoomList';
import RoomBuilder from '@/app/(home)/(communication)/channel/_room/roomBuilder';
import MyRoomList from '@/app/(home)/(communication)/channel/_room/myRoomList';
import MyParticipantInfoProvider from '@/app/(home)/(communication)/channel/MyParticipantInfoContext';

export const metadata: Metadata = {
  title: 'channel',
  description: '채팅 채널입니다.',
};

export default function ChannelLayout({ children }: childrenProps) {
  return (
    <MyParticipantInfoProvider>
      <div>
        <h1>Channel</h1>
        <div style={{ display: 'flex', gap: '200px' }}>
          <AllRoomList />
          <MyRoomList />
          <RoomBuilder title={'방 생성'} method={'POST'} url={'chat'} />
          {children}
        </div>
      </div>
    </MyParticipantInfoProvider>
  );
}
