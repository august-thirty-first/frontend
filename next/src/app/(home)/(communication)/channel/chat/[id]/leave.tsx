import { useRouter } from 'next/navigation';
import { useFetch } from '@/lib/useFetch';
import Btn from '@/components/btn';
import { useContext, useEffect } from 'react';
import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';
import { useMyParticipantInfo } from '@/app/(home)/(communication)/channel/MyParticipantInfoContext';
import { ParticipantAuthority } from '@/interfaces/chatParticipant.interface';
import { mutate } from 'swr';

export default function RoomLeave({ roomId }: { roomId: number }) {
  const router = useRouter();
  const socket = useContext(HomeSocketContext);
  const [myParticipantInfo] = useMyParticipantInfo();

  const { isLoading, statusCodeRef, fetchData } = useFetch<void>({
    autoFetch: false,
    method: 'DELETE',
    url: `chat/participant/leave/${roomId}`,
  });

  // Todo: 기존에 방에 참여하고 있었던 사용자에 대한 처리 필요

  useEffect(() => {
    socket.on('deleteRoom', () => {
      leaveRoom();
    });
    return () => {
      socket.off('deleteRoom');
    };
  }, []);

  async function leaveRoom() {
    await fetchData();

    if (myParticipantInfo?.authority === ParticipantAuthority.BOSS) {
      socket.emit('deleteRoom', JSON.stringify({ roomId: roomId }));
    }
    await mutate('allRoomList');
    await mutate('myRoomList');
    router.push(`/channel/`);
  }

  return <Btn title={'방 나가기'} type={'button'} handler={leaveRoom} />;
}
