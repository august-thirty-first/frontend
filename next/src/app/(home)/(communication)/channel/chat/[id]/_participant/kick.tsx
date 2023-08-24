import ChatParticipant from '@/interfaces/chatParticipant.interface';
import { useRouter } from 'next/navigation';
import Btn from '@/components/btn';
import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';
import { useContext, useEffect } from 'react';
import useToast from '@/components/toastContext';

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

  useEffect(() => {
    socket.on('kickReturnStatus', msg => {
      toast(msg);
    });
    socket.on('kick', msg => {
      toast(msg);
      router.push('/channel');
    });
    return () => {
      socket.off('kick');
    };
  }, []);

  function kickParticipant() {
    socket.emit(
      'kick',
      JSON.stringify({ roomId: roomId, targetUserId: targetUserId }),
    );
  }
  //
  return <Btn title={'kick'} type={'button'} handler={kickParticipant} />;
}
