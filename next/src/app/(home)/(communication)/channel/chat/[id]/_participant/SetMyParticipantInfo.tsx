import { useMyParticipantInfo } from '@/app/(home)/(communication)/channel/MyParticipantInfoContext';
import { useFetch } from '@/lib/useFetch';
import ChatParticipant from '@/interfaces/chatParticipant.interface';
import { useEffect } from 'react';

export default function SetMyParticipantInfo({ roomId }: { roomId: number }) {
  const [, setMyParticipantInfo] = useMyParticipantInfo();
  const { isLoading, statusCodeRef, dataRef, bodyRef, fetchData } =
    useFetch<ChatParticipant>({
      autoFetch: false,
      method: 'GET',
      url: `chat/myParticipant/${roomId}`,
    });

  useEffect(() => {
    fetchData().then(() => setMyParticipantInfo(dataRef?.current));
  }, []);

  return null;
}
