'use client';
import io from 'socket.io-client';
import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFetch } from '@/lib/useFetch';
import { useShowModal } from '../ShowModalContext';
import useToast from '@/components/toastContext';

const isClient = typeof window !== 'undefined';
const homeSocket = isClient
  ? io(`${process.env.NEXT_PUBLIC_BACKEND_URL}/home`, {
      transports: ['websocket'],
    })
  : io();

export const HomeSocketContext = createContext(homeSocket);
const HomeSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const alertModal = useShowModal();
  const toast = useToast();
  const { fetchData } = useFetch<void>({
    autoFetch: false,
    url: 'auth/logout',
    method: 'GET',
  });
  const [connected, setConnected] = useState<boolean>(true);

  useEffect(() => {
    setConnected(homeSocket.connected);

    homeSocket.on('connect', () => {
      setConnected(true);
      console.log('hello ');
    });
    homeSocket.on('connection', msg => {
      setConnected(true);
      console.log(msg);
    });
    homeSocket.on('disconnect', msg => {
      setConnected(false);
    });
    homeSocket.on('multipleConnect', () => {
      alertModal('다중 로그인 상태.');
      router.push('/login');
    });
    homeSocket.on('expired', async () => {
      alertModal('서버와의 연결이 끊어졌습니다. 다시 로그인해주세요.');
      await fetchData();
      if (homeSocket.connected) homeSocket.disconnect();
      router.replace('/login');
    });
    homeSocket.on('directMessage', (msg: string) => {
      const split_msg = msg.split(':');
      toast(`${split_msg[0]}님의 메세지가 도착했습니다..`);
    });
    homeSocket.on('waitingPlayer', () => {
      router.replace('/game/general');
    });
    homeSocket.on('requestGeneralGameError', (msg: string) => {
      toast(msg);
    });
    homeSocket.on(
      'selectJoin',
      (fromUserId: number, fromUserNickname: string) => {
        toast(`${fromUserNickname}님이 게임 초대를 하셨습니다.`, () => {
          router.replace(`/game/general?userId=${fromUserId}`);
        });
      },
    );
    return () => {
      homeSocket.off('selectJoin');
      homeSocket.off('requestGeneralGameError');
      homeSocket.off('waitingPlayer');
      homeSocket.off('connect');
      homeSocket.off('connection');
      homeSocket.off('multipleConnect');
      homeSocket.off('expired');
      homeSocket.off('directMessage');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <HomeSocketContext.Provider value={homeSocket}>
      {!connected && (
        <div className="flex justify-center bg-slate-300">
          서버와의 연결이 끊어졌습니다.. <a href="/">재접속..</a>
        </div>
      )}
      {children}
    </HomeSocketContext.Provider>
  );
};

export default HomeSocketProvider;
