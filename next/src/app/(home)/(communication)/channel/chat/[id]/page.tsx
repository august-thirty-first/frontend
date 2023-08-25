'use client';
import { useContext } from 'react';
import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';
import ChatBox from '@/app/(home)/(communication)/channel/chat/[id]/chatBox';
import RoomBuilder from '@/app/(home)/(communication)/channel/_room/roomBuilder';
import { useRouter } from 'next/navigation';
import { useFetch } from '@/lib/useFetch';
import ChatParticipant, {
  ParticipantAuthority,
} from '@/interfaces/chatParticipant.interface';
import RoomLeave from '@/app/(home)/(communication)/channel/chat/[id]/leave';
import { useMyParticipantInfo } from '@/app/(home)/(communication)/channel/MyParticipantInfoContext';
import ChatParticipantList from '@/app/(home)/(communication)/channel/chat/[id]/_participant/chatParticipant';

export default function Chat({ params }: { params: { id: string } }) {
  const router = useRouter();
  const socket = useContext(HomeSocketContext);
  const [myParticipantInfo] = useMyParticipantInfo();
  const roomId = parseInt(params.id);
  const { isLoading, statusCodeRef, dataRef, bodyRef } = useFetch<
    ChatParticipant[]
  >({
    autoFetch: true,
    method: 'GET',
    contentType: 'application/json',
    url: `chat/allParticipant/${roomId}`,
  });

  if (statusCodeRef?.current !== undefined && statusCodeRef?.current >= 400) {
    router.push('/channel');
    return;
  }
  socket.emit('enterRoom', JSON.stringify({ roomId: roomId }));

  return (
    dataRef?.current && (
      <div>
        <ChatParticipantList roomId={roomId} participants={dataRef.current} />
        <ChatBox roomId={roomId} />
        {/*Todo: 유저의 권한에 대해 확인하고 RoomDelete, RoomUpdate 두 컴포넌트를 보이게 하는 코드 필요*/}
        <RoomLeave roomId={roomId} />
        {(myParticipantInfo?.authority === ParticipantAuthority.BOSS ||
          myParticipantInfo?.authority === ParticipantAuthority.ADMIN) && (
          <RoomBuilder
            title={'방 수정'}
            method={'PATCH'}
            url={`chat/${roomId}`}
          />
        )}
      </div>
    )
  );
}
