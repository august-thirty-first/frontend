'use client';
import io from 'socket.io-client';
import { createContext, useEffect } from 'react';

const homeSocket = io('http://localhost:3000/home', {
  transports: ['websocket'],
});

export const HomeSocketContext = createContext(homeSocket);
const HomeSocketProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    homeSocket.on('connect', () => {
      console.log('hello ');
    });
    homeSocket.on('connection', msg => {
      console.log(msg);
    });
  }, []);
  return (
    <HomeSocketContext.Provider value={homeSocket}>
      {children}
    </HomeSocketContext.Provider>
  );
};

export default HomeSocketProvider;
