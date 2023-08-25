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

/*
1. validate
    - option 0
    - game: 미구현
2. 동일 유저
    - ladder 0
    - option 0
    - game 0
3. 새로고침
    - ladder ***
    잘 끊어지고 잘 재연결된다(큐에 중복되지 않음)!
    다만 여러 번 시도하면 대부분 재연결, 가끔은 재연결되지 않고 profile로 간다.
    - option 0
    한쪽이 끊어지면 서버에서 감지해서 다른 쪽도 알려주고
    끊긴 자신은 홈으로 간다
    - game ***
      : renderInfo 읽을 수 없음 에러 발생 (재연결하면서)
4. 뒤로가기
    - ladder ***
      : 소켓이 안 끊어짐
    - option 0
    - game 0
*/

export const GameSocketContext = createContext(gameSocket);
const GameSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  useEffect(() => {
    const disconnectListener = () => {
      router.push('/profile');
    };
    gameSocket.on('disconnect', disconnectListener);

    //새로고침
    const beforeunloadListener = (event: any) => {};
    window.addEventListener('beforeunload', beforeunloadListener);

    //TODO:뒤로가기
    const popstateListener = () => {
      gameSocket.disconnect();
    };
    window.addEventListener('popstate', popstateListener);

    return () => {
      gameSocket.off('disconnect', disconnectListener);
      // window.removeEventListener('beforeunload', beforeunloadListener);
      window.removeEventListener('popstate', popstateListener);
      gameSocket.disconnect();
    };
  }, []);

  return (
    <GameSocketContext.Provider value={gameSocket}>
      {children}
    </GameSocketContext.Provider>
  );
};

export default GameSocketProvider;
