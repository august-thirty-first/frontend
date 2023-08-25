'use client';
import { useFetch } from '@/lib/useFetch';
import ChatRoom from '@/interfaces/chatRoom.interface';
import Btn from '@/components/btn';
import { useState } from 'react';
import RoomDetails from '@/app/(home)/(communication)/channel/_room/roomDetails';
import useSWR from 'swr';

export default function RoomList({
  listAPI,
  joinAPI,
  swrKey,
}: {
  listAPI: string;
  joinAPI: string;
  swrKey: string;
}) {
  const { dataRef, fetchData } = useFetch<ChatRoom[]>({
    autoFetch: true,
    method: 'GET',
    url: listAPI,
  });
  const [showDetails, setShowDetails] = useState<number | null>(null);

  useSWR(swrKey, fetchData);

  return (
    <div>
      {dataRef?.current &&
        dataRef?.current.map((room: ChatRoom, index: number) => (
          <div key={index}>
            <Btn
              title={`[${room.id}] ${room.room_name}`}
              type={'button'}
              handler={() =>
                setShowDetails(showDetails === room.id ? null : room.id)
              }
            />
            {showDetails === room.id && (
              <RoomDetails room={room} joinAPI={joinAPI} />
            )}
          </div>
        ))}
    </div>
  );
}
