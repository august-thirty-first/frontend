import Btn from '@/components/btn';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';
import ChatParticipant from '@/interfaces/chatParticipant.interface';
import useToast from '@/components/toastContext';

export default function Mute({
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

  function muteParticipant() {
    socket.emit(
      'mute',
      JSON.stringify({
        roomId: roomId,
        targetUserId: targetUserId,
      }),
    );
  }

  return <Btn title={'mute'} handler={muteParticipant} />;
}
