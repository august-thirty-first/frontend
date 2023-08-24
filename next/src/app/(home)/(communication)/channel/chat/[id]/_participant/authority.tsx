import { useRouter } from 'next/navigation';
import { useFetch } from '@/lib/useFetch';
import ChatParticipant, {
  ParticipantAuthority,
} from '@/interfaces/chatParticipant.interface';
import Btn from '@/components/btn';
import { useShowModal } from '@/app/ShowModalContext';
import { useContext } from 'react';
import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';

export default function SwitchAuthority({
  participant,
  roomId,
}: {
  participant: ChatParticipant;
  roomId: number;
}) {
  const targetUserId = participant.user.id;
  const authority = participant.authority;
  const isNormal = authority === ParticipantAuthority.NORMAL;
  const router = useRouter();
  const socket = useContext(HomeSocketContext);
  const alertModal = useShowModal();
  const { statusCodeRef, bodyRef, fetchData } = useFetch<ChatParticipant>({
    autoFetch: false,
    method: 'PATCH',
    url: `chat/participant/authority/${targetUserId}`,
  });

  async function switchAuthority() {
    bodyRef.current = JSON.stringify({
      chat_room_id: roomId,
      authority: isNormal
        ? ParticipantAuthority.ADMIN
        : ParticipantAuthority.NORMAL,
      target_user_id: targetUserId,
    });
    await fetchData();
    if (statusCodeRef?.current === 200) {
      // socket.emit('banRoom', JSON.stringify({ roomId: roomId }));
    }
  }
  return (
    <Btn
      title={isNormal ? '관리자로 승격' : '관리자 자격 박탈'}
      handler={switchAuthority}
    />
  );
}
