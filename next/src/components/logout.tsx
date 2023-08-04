'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import commonResponse from '@/lib/interface/commonResponse.interface';

async function logoutAPI(): Promise<commonResponse<void>> {
  const backend_url = 'http://localhost:3000/api';
  let result: commonResponse<void> = {};
  try {
    const response = await fetch(`${backend_url}/auth/logout`, {
      method: 'GET',
      credentials: 'include',
    });
    result.status = response.status;
    return result;
  } catch (error: any) {
    result.error = error.message;
    return result;
  }
}

export default function Logout() {
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const router = useRouter();

  const onClick = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    const res = await logoutAPI();
    if (res.error) alert(`Error during logout: ${res.error}`);
    else router.replace('/');
    setIsLoggingOut(false);
  };

  return <button onClick={onClick}>logout</button>;
}
