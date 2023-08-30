import { searchProfileResponse } from '@/app/(home)/(communication)/profile/searchBar';
import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';
import { useFetch } from '@/lib/useFetch';
import { useContext } from 'react';
import Btn from './btn';
import useToast from './toastContext';

export interface playGameBtnProps {
  nickname: string;
}

const PlayGameBtn = ({ nickname }: playGameBtnProps) => {
  const socket = useContext(HomeSocketContext);
  const { fetchData, dataRef } = useFetch<searchProfileResponse>({
    autoFetch: false,
    url: `profile/user?nickname=${nickname}`,
    method: 'GET',
  });
  const toast = useToast();

  const onClick = async () => {
    if (confirm('게임 초대를 하시겠습니까?')) {
      await fetchData();
      if (dataRef?.current) {
        const userId = dataRef.current.id;
        socket.emit('requestGeneralGame', userId);
      } else toast('찾을 수 없는 사용자입니다.');
    }
  };

  return <Btn title="PLAY" handler={onClick} />;
};

export default PlayGameBtn;
