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
      <div className="flex">
        <div className="w-1/3 pr-4 pl-10 flex flex-col">
          <div className="flex">
            <div className="w-1/2 pr-2">
              <AllRoomList />
            </div>
            <div className="w-1/2 pl-2">
              <MyRoomList />
            </div>
          </div>
        </div>
        <div className="w-2/3">
          <RoomBuilder title={'방 생성'} method={'POST'} url={'chat'} />
          <div className="mt-14 border border-gray-300 rounded p-2">
            {children}
          </div>
        </div>
      </div>
    </MyParticipantInfoProvider>
  );
}
