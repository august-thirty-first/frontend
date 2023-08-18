'use client';
import { useFetch } from '@/lib/useFetch';
import { useRouter } from 'next/navigation';
import ChatRoom, { RoomStatus } from '@/interfaces/chatRoom.interface';
import Btn from '@/components/btn';
import { useState } from 'react';
import ChatParticipant from '@/interfaces/chatParticipant.interface';
import RoomDetails from '@/app/(home)/(communication)/channel/_room/roomDetails';

export default function RoomList({
  listAPI,
  joinAPI,
}: {
  listAPI: string;
  joinAPI: string;
}) {
  const router = useRouter();
  const { isLoading, dataRef } = useFetch<ChatRoom[]>({
    autoFetch: true,
    method: 'GET',
    url: listAPI,
  });
  const [showDetails, setShowDetails] = useState<number | null>(null);

  if (isLoading) {
    return <p>Loading..</p>;
  }

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
