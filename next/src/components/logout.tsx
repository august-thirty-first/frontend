'use client';

import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';
import { useShowModal } from '@/app/ShowModalContext';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import Btn from './btn';

export default function Logout() {
  const socket = useContext(HomeSocketContext);
  const router = useRouter();
  const backend_url = 'http://localhost:3000/api';
  const alertModal = useShowModal();

  const onClick = async () => {
    try {
      await fetch(`${backend_url}/auth/logout`, {
        method: 'GET',
        credentials: 'include',
      });
      if (socket.connected) socket.disconnect();
      router.replace('/login');
    } catch (error: any) {
      alertModal(`Error during logout: ${error.message}`);
    }
  };

  socket.on('multipleConnect', () => {
    alertModal('다중 로그인 상태입니다.');
    router.push('/login');
    socket.disconnect();
  });

  socket.on('expired', () => {
    alertModal('서버와의 연결이 끊어졌습니다. 다시 로그인해주세요.');
    onClick();
  });

  return <Btn handler={onClick} title="logout" />;
}
