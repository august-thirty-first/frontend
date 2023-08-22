'use client';
import { useContext } from 'react';
import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';
import ChatBox from '@/app/(home)/(communication)/channel/chat/[id]/chatBox';
import RoomDelete from '@/app/(home)/(communication)/channel/chat/[id]/delete';
import RoomBuilder from '@/app/(home)/(communication)/channel/_room/roomBuilder';
import { useParams, useRouter } from 'next/navigation';
import { useFetch } from '@/lib/useFetch';
import ChatParticipant, {
  ParticipantAuthority,
} from '@/interfaces/chatParticipant.interface';
import RoomLeave from '@/app/(home)/(communication)/channel/chat/[id]/leave';
import { useMyParticipantInfo } from '@/app/(home)/(communication)/channel/MyParticipantInfoContext';

export default function Chat() {
  const router = useRouter();
  const socket = useContext(HomeSocketContext);
  const [myParticipantInfo] = useMyParticipantInfo();
  const params = useParams();
  const roomId = params.id;
  const { isLoading, statusCodeRef, dataRef, bodyRef } = useFetch<
    ChatParticipant[]
  >({
    autoFetch: true,
    method: 'GET',
    contentType: 'application/json',
    url: `chat/participant/${roomId}`,
  });

  if (statusCodeRef?.current !== undefined && statusCodeRef?.current >= 400) {
    router.push('/channel');
    return;
  }
  socket.emit('enterRoom', JSON.stringify({ roomId: roomId }));

  return (
    dataRef?.current && (
      <div>
        <ChatBox />
        {/*Todo: 유저의 권한에 대해 확인하고 RoomDelete, RoomUpdate 두 컴포넌트를 보이게 하는 코드 필요*/}
        <RoomLeave />
        {(myParticipantInfo?.authority === ParticipantAuthority.BOSS ||
          myParticipantInfo?.authority === ParticipantAuthority.ADMIN) && (
          <>
            <RoomDelete />
            <RoomBuilder
              title={'방 수정'}
              method={'PATCH'}
              url={`chat/${roomId}`}
            />
          </>
        )}
      </div>
    )
  );
}
