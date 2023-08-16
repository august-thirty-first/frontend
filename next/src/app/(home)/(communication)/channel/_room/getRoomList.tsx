'use client';
import { useFetch } from '@/lib/useFetch';
import { useRouter } from 'next/navigation';
import ChatRoom, { RoomStatus } from '@/interfaces/chatRoom.interface';
import Btn from '@/components/btn';

export default function GetRoomList({ url }: { url: string }) {
  const router = useRouter();
  const { isLoading, dataRef, fetchData } = useFetch<ChatRoom[]>({
    autoFetch: true,
    method: 'GET',
    url: url,
  });

  if (isLoading) {
    return <p>Loading..</p>;
  }

  function enterRoom(room: ChatRoom) {
    const url =
      room.status == RoomStatus.protected
        ? `/channel/chat?roomId=${room.id}&requirePassword=true}`
        : `/channel/chat?roomId=${room.id}`;
    router.push(url);
  }

  return (
    <div>
      {dataRef?.current &&
        dataRef?.current.map((room: ChatRoom, index: number) => (
          <Btn
            title={`[${room.id}] ${room.room_name}`}
            key={index}
            type={'button'}
            handler={() => enterRoom(room)}
          />
        ))}
    </div>
  );
}
