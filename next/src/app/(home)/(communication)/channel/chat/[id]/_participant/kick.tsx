import ChatParticipant from '@/interfaces/chatParticipant.interface';
import { useParams, useRouter } from 'next/navigation';
import { useShowModal } from '@/app/ShowModalContext';
import { useFetch } from '@/lib/useFetch';
import Btn from '@/components/btn';
import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';
import { useContext, useEffect } from 'react';
import useToast from '@/components/toastContext';

export default function Kick({
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
