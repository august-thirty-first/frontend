'use client';
import { useRef, useContext, useEffect, useState } from 'react';
import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';
import EnterRoom from '@/app/(home)/(communication)/channel/enterRoom';

export default function Channel() {
  const socket = useContext(HomeSocketContext);

  const [room, setRoom] = useState('');

  useEffect(() => {
    socket.on('roomChange', room => {
      setRoom(room);
    });
  }, []);

  return <div></div>;
}
