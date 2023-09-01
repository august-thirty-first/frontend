'use client';
import { useContext, useEffect } from 'react';
import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';
import ChatBox from '@/app/(home)/(communication)/channel/chat/[id]/chatBox';
import RoomBuilder from '@/app/(home)/(communication)/channel/_room/roomBuilder';
import { useRouter } from 'next/navigation';
import { useFetch } from '@/lib/useFetch';
import ChatParticipant, {
  ChatParticipantWithBlackList,
  ParticipantAuthority,
} from '@/interfaces/chatParticipant.interface';
import RoomLeave from '@/app/(home)/(communication)/channel/chat/[id]/leave';
import { useMyParticipantInfo } from '@/app/(home)/(communication)/channel/MyParticipantInfoContext';
import ChatParticipantList from '@/app/(home)/(communication)/channel/chat/[id]/_participant/chatParticipant';
import useToast from '@/components/toastContext';
import SetMyParticipantInfo from '@/app/(home)/(communication)/channel/chat/[id]/_participant/SetMyParticipantInfo';
import useSWR, { mutate } from 'swr';

function ListenEvent({ roomId }: { roomId: number }) {
  const socket = useContext(HomeSocketContext);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    socket.emit('enterRoom', JSON.stringify({ roomId: roomId }));
    socket.on('mute', msg => {
      toast(msg);
    });
    socket.on('muteReturnStatus', msg => {
      toast(msg);
    });
    socket.on('kick', msg => {
      toast(msg);
      router.push('/channel');
      mutate('participant');
    });
    socket.on('kickReturnStatus', msg => {
      toast(msg);
      mutate('participant');
    });
    socket.on('ban', msg => {
      toast(msg);
      router.push('/channel');
      mutate('participant');
    });
    socket.on('toAdmin', msg => {
      if (msg) toast(msg);
      mutate('participant');
      mutate('myParticipantInfo');
    });
    socket.on('toNormal', msg => {
      if (msg) toast(msg);
      mutate('participant');
      mutate('myParticipantInfo');
    });
    socket.on('toAdminReturnStatus', msg => {
      toast(msg);
      mutate('participant');
    });
    socket.on('toNormalReturnStatus', msg => {
      toast(msg);
      mutate('participant');
    });
    socket.on('banReturnStatus', msg => {
      toast(msg);
      mutate('participant');
    });
    socket.on('unbanReturnStatus', msg => {
      toast(msg);
      mutate('participant');
    });
    socket.on('setBlackList', msg => {
      toast(msg);
      mutate('participant');
    });
    socket.on('unSetBlackList', msg => {
      toast(msg);
      mutate('participant');
    });
    socket.on('enterRoom', msg => {
      mutate('participant');
    });

    return () => {
      socket.off('mute');
      socket.off('muteReturnStatus');
      socket.off('deleteRoom');
      socket.off('kick');
      socket.off('kickReturnStatus');
      socket.off('ban');
      socket.off('toAdmin');
      socket.off('toNormal');
      socket.off('toAdminReturnStatus');
      socket.off('toNormalReturnStatus');
      socket.off('banReturnStatus');
      socket.off('unbanReturnStatus');
      socket.off('setBlackList');
      socket.off('unSetBlackList');
      socket.off('enterRoom');
    };
  }, []);

  return null;
}

export default function Chat({ params }: { params: { id: string } }) {
  const router = useRouter();
  const socket = useContext(HomeSocketContext);
  const [myParticipantInfo] = useMyParticipantInfo();
  const roomId = parseInt(params.id);
  const { statusCodeRef, dataRef, bodyRef, fetchData } = useFetch<
    ChatParticipantWithBlackList[]
  >({
    autoFetch: true,
    method: 'GET',
    contentType: 'application/json',
    url: `chat/allParticipant/${roomId}`,
  });

  useSWR('participant', fetchData);

  if (statusCodeRef?.current !== undefined && statusCodeRef?.current >= 400) {
    router.push('/channel');
    return;
  }

  return (
    dataRef?.current && (
      <div>
        <SetMyParticipantInfo roomId={roomId} />
        <ListenEvent roomId={roomId} />
        <ChatParticipantList roomId={roomId} participants={dataRef.current} />
        <ChatBox roomId={roomId} />
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
