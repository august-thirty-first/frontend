'use client';
import io from 'socket.io-client';
import { createContext } from 'react';

const gameSocket = io('http://localhost:3000/game', {
  transports: ['websocket'],
});

const GameSocketContext = createContext(gameSocket);
const GameSocketProvider = ({ children }: { children: React.ReactNode }) => {
  console.log(gameSocket);
  return (
    <GameSocketContext.Provider value={gameSocket}>
      {children}
    </GameSocketContext.Provider>
  );
};

export default GameSocketProvider;
