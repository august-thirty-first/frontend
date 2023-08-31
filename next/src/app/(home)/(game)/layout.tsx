import childrenProps from '@/interfaces/childrenProps.interface';
import GameSocketProvider from './createGameSocketContext';
import ModalProvider from './modalProvider';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'game',
  description: 'game 관련 페이지 입니다',
};

export default function GameLayout({ children }: childrenProps) {
  return (
    <div>
      <GameSocketProvider>
        <ModalProvider>{children}</ModalProvider>
      </GameSocketProvider>
    </div>
  );
}
