'use client';
import { useRef, useContext, useEffect, useState } from 'react';
import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';
import EnterRoom from '@/components/(home)/(communication)/channel/enterRoom';
import SendMessage from '@/components/(home)/(communication)/channel/sendMessage';

export default function Channel() {
  const socket = useContext(HomeSocketContext);
  const [room, setRoom] = useState('');

  useEffect(() => {
    socket.on('roomChange', room => {
      setRoom(room);
    });
  }, []);

  return (
    <div>
      <h1>Channel</h1>
      <EnterRoom />
      <h1> {room} 입니다.</h1>
    </div>
  );
}
