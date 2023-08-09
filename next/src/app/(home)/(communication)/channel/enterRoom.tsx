'use client';
import { useContext, useState } from 'react';
import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';
import { useRouter } from 'next/navigation';
import Btn from '@/components/btn';

export default function EnterRoom() {
  const socket = useContext(HomeSocketContext);
  const [roomName, setRoomName] = useState('');
  const router = useRouter();

  function handleOnSubmitRoom(event: any) {
    event.preventDefault();
    console.log('roomName', roomName);
    socket.emit('enterRoom', roomName);
    router.push(`/channel/chat?roomName=${roomName}`);
    setRoomName('');
  }

  return (
    <form onSubmit={handleOnSubmitRoom}>
      <input
        value={roomName}
        onChange={event => setRoomName(event.target.value)}
      ></input>
      <Btn type="submit" title="방 입장" />
    </form>
  );
}
