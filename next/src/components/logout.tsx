'use client';

import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';
import { useFetch } from '@/lib/useFetch';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import Btn from './btn';

export default function Logout() {
  const socket = useContext(HomeSocketContext);
  const router = useRouter();
  const { fetchData } = useFetch<void>({
    autoFetch: false,
    url: 'auth/logout',
    method: 'GET',
  });

  const onClick = async () => {
    await fetchData();
    if (socket.connected) socket.disconnect();
    router.replace('/login');
  };

  return <Btn handler={onClick} title="logout" />;
}
