'use client';
import { useContext, useEffect, useState } from 'react';
import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';
import { useRouter } from 'next/navigation';

async function showChatRoomAPI() {
  const backend_url = 'http://localhost:3000/api';

  const response = await fetch(`${backend_url}/chat`, {
    method: 'get',
    credentials: 'include',
  });
  return await response.json();
}

export default function RoomList() {
  const [roomList, setRoomList] = useState([]);
  const socket = useContext(HomeSocketContext);
  const router = useRouter();

  function handleOnClick(event: any) {
    event.preventDefault();
    console.log('roomName', event.target.value);
    socket.emit('enterRoom', event.target.value);
    router.push(`/channel/chat?roomId=${event.target.value}`);
  }

  useEffect(() => {
    showChatRoomAPI().then(data => {
      setRoomList(data);
    });
  }, []);

  return (
    <div>
      {roomList.map((room: any, index) => (
        <button
          key={index}
          type={'submit'}
          onClick={handleOnClick}
          value={room.id}
        >
          [{room.id}] {room.room_name}
        </button>
      ))}
    </div>
  );
}
