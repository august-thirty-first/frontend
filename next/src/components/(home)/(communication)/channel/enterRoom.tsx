'use client';
import { useContext, useState } from 'react';
import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';
import Link from 'next/link';

export default function EnterRoom() {
  const socket = useContext(HomeSocketContext);
  const [roomName, setRoomName] = useState('');

  function handleOnSubmitRoom(event: any) {
    event.preventDefault();
    socket.emit('enterRoom', roomName);
    setRoomName('');
  }

  return (
    <form onSubmit={handleOnSubmitRoom}>
      <input
        value={roomName}
        onChange={event => setRoomName(event.target.value)}
      ></input>
      <Link href={`/channel/chat?roomName=${roomName}`}>
        <button type="submit">방 입장</button>
      </Link>
    </form>
  );
}
