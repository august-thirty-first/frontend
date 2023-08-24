'use client';
import io from 'socket.io-client';
import { createContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const isClient = typeof window !== 'undefined';
const gameSocket = isClient
  ? io('http://localhost:3000/game', {
      transports: ['websocket'],
    })
  : io();

export const GameSocketContext = createContext(gameSocket);
const GameSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  useEffect(() => {
    const disconnectListener = () => {
      // openModal('연결이 끊겼습니다..'); //새로고침, 뒤로가기하면 이 모달창이 안 보인다
      router.push('/profile'); // 새로고침 시 무시됨. validate를 통해 소켓 연결 안 시켜주는 작업 필요
    };
    gameSocket.on('disconnect', disconnectListener);

    //새로고침
    const beforeunloadListener = (event: any) => {
      event.returnValue = ''; //한 번 더 물어본다. unload를 선택하면 소켓이 끊어지고, 다시 연결되기 전에 바로 홈으로 돌아간다.
    };
    window.addEventListener('beforeunload', beforeunloadListener);

    //TODO:뒤로가기
    window.addEventListener('popstate', event => {});

    return () => {
      gameSocket.off('disconnect', disconnectListener);
      window.removeEventListener('beforeunload', beforeunloadListener);
      // window.removeEventListener('popstate', popstateListener);
    };
  }, []);

  return (
    <GameSocketContext.Provider value={gameSocket}>
      {children}
    </GameSocketContext.Provider>
  );
};

export default GameSocketProvider;
