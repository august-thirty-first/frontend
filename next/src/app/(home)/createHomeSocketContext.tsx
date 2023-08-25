'use client';
import io from 'socket.io-client';
import { createContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFetch } from '@/lib/useFetch';
import { useShowModal } from '../ShowModalContext';

const isClient = typeof window !== 'undefined';
const homeSocket = isClient
  ? io('http://localhost:3000/home', {
      transports: ['websocket'],
    })
  : io();

export const HomeSocketContext = createContext(homeSocket);
const HomeSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const alertModal = useShowModal();
  const { fetchData } = useFetch<void>({
    autoFetch: false,
    url: 'auth/logout',
    method: 'GET',
  });

  useEffect(() => {
    homeSocket.on('connect', () => {
      console.log('hello ');
    });
    homeSocket.on('connection', msg => {
      console.log(msg);
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
    return () => {
      homeSocket.off('connect');
      homeSocket.off('connection');
      homeSocket.off('multipleConnect');
      homeSocket.off('expired');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <HomeSocketContext.Provider value={homeSocket}>
      {children}
    </HomeSocketContext.Provider>
  );
};

export default HomeSocketProvider;
