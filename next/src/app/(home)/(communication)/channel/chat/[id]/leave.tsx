import { useRouter } from 'next/navigation';
import { useFetch } from '@/lib/useFetch';
import Btn from '@/components/btn';
import { useContext } from 'react';
import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';
import { useMyParticipantInfo } from '@/app/(home)/(communication)/channel/MyParticipantInfoContext';

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
  // socket.on('leaveRoom', () => {
  //   leaveRoom();
  // });

  async function leaveRoom() {
    await fetchData();

    // if i am boss? send leaveRoom event
    // if (myParticipantInfo?.authority === ParticipantAuthority.BOSS) {
    //   socket.emit('leaveRoom', JSON.stringify({ roomId: roomId }));
    // }
    router.push(`/channel/`);
  }

  return <Btn title={'방 나가기'} type={'button'} handler={leaveRoom} />;
}
