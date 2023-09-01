import ChatParticipant from '@/interfaces/chatParticipant.interface';
import { useRouter } from 'next/navigation';
import Btn from '@/components/btn';
import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';
import { useContext, useEffect } from 'react';
import useToast from '@/components/toastContext';
import SmallBtn from '@/components/smallBtn';

export default function Kick({
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

  function kickParticipant() {
    socket.emit(
      'kick',
      JSON.stringify({ roomId: roomId, targetUserId: targetUserId }),
    );
  }
  //
  return <SmallBtn title={'kick'} type={'button'} handler={kickParticipant} />;
}
