'use client';
import io from 'socket.io-client';
import { createContext, useEffect } from 'react';
import { useModal } from './modalProvider';

const isClient = typeof window !== 'undefined';
const gameSocket = isClient
  ? io('http://localhost:3000/game', {
      transports: ['websocket'],
    })
  : io();

export const GameSocketContext = createContext(gameSocket);
const GameSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { openModal } = useModal();
  useEffect(() => {
    const disconnectListener = () => {
      openModal('연결이 끊겼습니다..'); //새로고침, 뒤로가기를 포함하여 소켓이 끊기는 모든 상황을 처리하기 위해, 여기서 띄운다
    };
    gameSocket.on('disconnect', disconnectListener);

    //새로고침
    window.addEventListener('beforeunload', event => {
      gameSocket.disconnect();
    });

    //뒤로가기
    window.addEventListener('popstate', event => {
      gameSocket.disconnect();
    });

    return () => {
      gameSocket.off('disconnect', disconnectListener);
    };
  }, []);

  return (
    <GameSocketContext.Provider value={gameSocket}>
      {children}
    </GameSocketContext.Provider>
  );
};

export default GameSocketProvider;
