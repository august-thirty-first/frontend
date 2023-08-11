import { useFetch } from '@/lib/useFetch';
import { useRouter, useSearchParams } from 'next/navigation';
import Btn from '@/components/btn';

export default function RoomDelete() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get('roomId');
  const router = useRouter();

  const { isLoading, statusCodeRef, fetchData } = useFetch<void>({
    autoFetch: false,
    method: 'delete',
    url: `chat/${roomId}`,
  });

  async function handleOnSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    await fetchData();

    if (isLoading) return <Btn title={'방 삭제중...'} />;

    // Todo: 기존에 방에 참여하고 있었던 사용자에 대한 처리 필요
    if (statusCodeRef?.current === 200) {
      alert('방 삭제 완료');
      router.push(`/channel/`);
    } else {
      alert('방 삭제 실패');
    }
  }

  return <Btn title={'방 삭제'} type={'submit'} handler={handleOnSubmit} />;
}
