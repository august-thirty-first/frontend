import { useMyParticipantInfo } from '@/app/(home)/(communication)/channel/MyParticipantInfoContext';
import { useFetch } from '@/lib/useFetch';
import ChatParticipant from '@/interfaces/chatParticipant.interface';
import { useEffect } from 'react';
import useSWR from 'swr';

export default function SetMyParticipantInfo({ roomId }: { roomId: number }) {
  const [, setMyParticipantInfo] = useMyParticipantInfo();
  const { isLoading, statusCodeRef, dataRef, bodyRef, fetchData } =
    useFetch<ChatParticipant>({
      autoFetch: false,
      method: 'GET',
      url: `chat/myParticipant/${roomId}`,
    });

  const { data } = useSWR('myParticipantInfo', fetchData);

  useEffect(() => {
    fetchData().then(() => setMyParticipantInfo(dataRef?.current));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return null;
}
