import childrenProps from '@/interfaces/childrenProps.interface';
import GameSocketProvider from './createGameSocketContext';
import ModalProvider from './modalProvider';

export default function GameLayout({ children }: childrenProps) {
  return (
    <div>
      <GameSocketProvider>
        <ModalProvider>{children}</ModalProvider>
      </GameSocketProvider>
    </div>
  );
}
