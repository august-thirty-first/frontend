'use client';
import { useContext } from 'react';
import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';
import ChatBox from '@/app/(home)/(communication)/channel/chat/chatBox';
import RoomDelete from '@/app/(home)/(communication)/channel/chat/delete';
import RoomBuilder from '@/app/(home)/(communication)/channel/roomBuilder';
import { useSearchParams } from 'next/navigation';

export default function Chat() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get('roomId');
  const socket = useContext(HomeSocketContext);

  return (
    <div>
      {<ChatBox />}
      {/*유저의 권한에 대해 확인하고 RoomDelete, RoomUpdate 두 컴포넌트를 보이게 하는 코드 필요*/}
      <RoomDelete />
      <RoomBuilder title={'방 수정'} method={'PATCH'} url={`chat/${roomId}`} />
    </div>
  );
}
