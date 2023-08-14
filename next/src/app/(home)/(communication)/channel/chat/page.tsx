'use client';
import { useContext } from 'react';
import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';
import { useSearchParams } from 'next/navigation';
import SubmitForm from '@/components/submitForm';
import ChatBox from '@/app/(home)/(communication)/channel/chat/chatBox';
import RoomDelete from '@/app/(home)/(communication)/channel/chat/delete';
import RoomUpdate from '@/app/(home)/(communication)/channel/chat/update';
import MyChatRoomList from '@/app/(home)/(communication)/channel/_list/myChatRoomList';

export default function Chat() {
  const socket = useContext(HomeSocketContext);

  return (
    <div>
      {<ChatBox />}
      {/*유저의 권한에 대해 확인하고 RoomDelete, RoomUpdate 두 컴포넌트를 보이게 하는 코드 필요*/}
      <RoomDelete />
      <RoomUpdate />
    </div>
  );
}
