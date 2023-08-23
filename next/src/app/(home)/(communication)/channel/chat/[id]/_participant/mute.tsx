import Btn from '@/components/btn';
import { useContext, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';
import ChatParticipant from '@/interfaces/chatParticipant.interface';
import useToast from '@/components/toastContext';

export default function Mute({
  participant,
}: {
  participant: ChatParticipant;
}) {
  const targetUserId = participant.user.id;
  const roomId = useParams().id;
  const router = useRouter();
  const socket = useContext(HomeSocketContext);
  const toast = useToast();

  useEffect(() => {
    socket.on('mute', msg => {
      toast(msg);
    });
    socket.on('muteReturnStatus', msg => {
      toast(msg);
    });
  }, []);
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
