'use client';
import io from 'socket.io-client';
import { createContext } from 'react';

const homeSocket = io('http://localhost:3000/home', {
  transports: ['websocket'],
});

const HomeSocketContext = createContext(homeSocket);
const HomeSocketProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <HomeSocketContext.Provider value={homeSocket}>
      {children}
    </HomeSocketContext.Provider>
  );
};

export default HomeSocketProvider;
