import childrenProps from '@/interfaces/childrenProps.interface';
import GameSocketProvider from './createGameSocketContext';

export default function GameLayout({ children }: childrenProps) {
  return (
    <div>
      <GameSocketProvider>{children}</GameSocketProvider>
    </div>
  );
}
