'use client';

import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import Btn from './btn';

export default function Logout() {
  const socket = useContext(HomeSocketContext);
  const router = useRouter();
  const backend_url = 'http://localhost:3000/api';

  const onClick = async () => {
    try {
      await fetch(`${backend_url}/auth/logout`, {
        method: 'GET',
        credentials: 'include',
      });
      if (socket.connected) socket.disconnect();
      router.replace('/login');
    } catch (error: any) {
      alert(`Error during logout: ${error.message}`);
    }
  };

  socket.on('disconnect', () => {
    alert('서버와의 연결이 끊어졌습니다. 다시 로그인해주세요.');
    onClick();
  });

  return <Btn handler={onClick} title="logout" />;
}
