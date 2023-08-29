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
    - game 0
2. 동일 유저
    - ladder 0
    - option 0
    - game 0
3. 새로고침
    - ladder ***
    잘 끊어지고 잘 재연결된다(큐에 중복되지 않음)!
    문제:
    새로고침 버튼으로 소켓이 끊어짐 -> 연결됨이 연쇄적으로 일어나면서,
    소켓끊김이벤트리스너는 홈으로 가려고 함 vs 새로고침버튼은 새화면으로 가려고 함

    1. 다른 얘들을 각각 처리해주고 disconnect 리스너는 안 만들면 된다.
    (그러려면 자동끊어지는 validate, 동일유저도 소켓이벤트 받아서 프론트에서 끊어야 함)
    2. 브라우저에게 맡긴다.

    - option 0
    한쪽이 끊어지면 서버에서 감지해서 다른 쪽도 알려주고
    끊긴 자신은 홈으로 간다
    - game
4. 뒤로가기
    - ladder 0
    - option 0
    - game 0
*/

export const GameSocketContext = createContext(gameSocket);
const GameSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = io('http://localhost:3000/game', {
    transports: ['websocket'],
  });
  const router = useRouter();
  useEffect(() => {
    const disconnectListener = () => {
      router.push('/profile');
    };
    gameSocket.on('disconnect', disconnectListener);

    //뒤로가기
    const popstateListener = () => {
      gameSocket.disconnect();
    };
    window.addEventListener('popstate', popstateListener);

    return () => {
      gameSocket.off('disconnect', disconnectListener);
      window.removeEventListener('popstate', popstateListener);
      gameSocket.disconnect();
    };
  }, []);

  return (
    <GameSocketContext.Provider value={socket}>
      {children}
    </GameSocketContext.Provider>
  );
};

export default GameSocketProvider;
