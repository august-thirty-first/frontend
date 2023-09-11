import { useRouter } from 'next/navigation';
import { useFetch } from '@/lib/useFetch';
import ChatParticipant from '@/interfaces/chatParticipant.interface';
import Btn from '@/components/btn';
import { useContext, useEffect } from 'react';
import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';
import useToast from '@/components/toastContext';
import SmallBtn from '@/components/smallBtn';

export default function Ban({
  participant,
  roomId,
}: {
  participant: ChatParticipant;
  roomId: number;
}) {
  const targetUserId = participant.user.id;
  const router = useRouter();
  const socket = useContext(HomeSocketContext);
  const toast = useToast();
  const ban = participant.ban === null ? 'ban' : 'unban';
  const { statusCodeRef, fetchData } = useFetch<ChatParticipant>({
    autoFetch: false,
    method: 'PATCH',
    url: `chat/participant/${ban}/${participant.user.id}/${roomId}`,
  });

  async function banParticipant() {
    await fetchData();
    if (statusCodeRef?.current === 200) {
      socket.emit(
        ban,
        JSON.stringify({ roomId: roomId, targetUserId: targetUserId }),
      );
    }
  }
  return <SmallBtn title={ban} handler={banParticipant} />;
}
