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
    문제:
      끊어지고 재연결되면서 다시 큐에 들어가지만, 화면은 profile로 라우팅 되는 상황
    해결:
      재연결되는 것도 끊어주거나 (다른 곳에서는 validate로 끊어줌)
      profile로 라우팅되지 않게 해야 함
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
    // const beforeunloadListener = () => {};
    // window.addEventListener('beforeunload', beforeunloadListener);

    //TODO:뒤로가기
    const popstateListener = () => {
      gameSocket.disconnect();
    };
    window.addEventListener('popstate', popstateListener);

    return () => {
      gameSocket.off('disconnect', disconnectListener);
      // window.removeEventListener('beforeunload', beforeunloadListener);
      window.removeEventListener('popstate', popstateListener);
    };
  }, []);

  return (
    <GameSocketContext.Provider value={gameSocket}>
      {children}
    </GameSocketContext.Provider>
  );
};

export default GameSocketProvider;
