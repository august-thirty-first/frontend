import ChatRoom, { RoomStatus } from '@/interfaces/chatRoom.interface';
import { useRouter } from 'next/navigation';
import { useFetch } from '@/lib/useFetch';
import ChatParticipant from '@/interfaces/chatParticipant.interface';
import Btn from '@/components/btn';

export default function RoomDetails({
  room,
  joinAPI,
}: {
  room: ChatRoom;
  joinAPI: string;
}) {
  const router = useRouter();
  const { isLoading, statusCodeRef, dataRef, bodyRef, fetchData } =
    useFetch<ChatParticipant>({
      autoFetch: false,
      method: 'POST',
      contentType: 'application/json',
      url: joinAPI,
    });

  async function joinRoom(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const password = new FormData(event.currentTarget).get('password');

    bodyRef.current = JSON.stringify({
      chat_room_id: room.id,
      password: requirePassword ? password : '',
      authority: 'nomral',
    });

    await fetchData();
    // Todo: 실패 상황일 때 팝업
    if (statusCodeRef?.current == 200 || statusCodeRef?.current === 201) {
      router.push(`/channel/chat/${room.id}`);
    } else {
      router.push('/channel');
    }
  }

  const requirePassword = room.status === RoomStatus.protected;
  return (
    <form onSubmit={joinRoom}>
      {requirePassword && (
        <>
          <label htmlFor={'password'}>비밀번호 입력</label>
          <input name={'password'} />
        </>
      )}
      <Btn title={'입장'} type={'submit'} />
    </form>
  );
}
