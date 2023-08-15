'use client';
import { useContext, useEffect, useState } from 'react';
import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';
import { useRouter } from 'next/navigation';
import { useFetch } from '@/lib/useFetch';
import ChatRoom from '@/interfaces/chatRoom.interface';

export default function ChatRoomList() {
  const { isLoading, dataRef, fetchData } = useFetch<ChatRoom[]>({
    autoFetch: true,
    method: 'get',
    url: 'chat',
  });
  const socket = useContext(HomeSocketContext);
  const router = useRouter();

  function handleOnClick(event: any) {
    event.preventDefault();
    console.log('roomName', event.target.value);
    socket.emit('enterRoom', event.target.value);
    router.push(`/channel/chat?roomId=${event.target.value}`);
  }

  if (isLoading) {
    return <p>Loading..</p>;
  }

  return (
    <div>
      {dataRef?.current &&
        dataRef?.current.map((room: any, index) => (
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
