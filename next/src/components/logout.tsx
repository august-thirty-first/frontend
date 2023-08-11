'use client';

import { useRouter } from 'next/navigation';
import Btn from './btn';

export default function Logout() {
  const router = useRouter();
  const backend_url = 'http://localhost:3000/api';

  const onClick = async () => {
    try {
      await fetch(`${backend_url}/auth/logout`, {
        method: 'GET',
        credentials: 'include',
      });
      router.replace('/login');
    } catch (error: any) {
      alert(`Error during logout: ${error.message}`);
    }
  };

  return <Btn handler={onClick} title="logout" />;
}
