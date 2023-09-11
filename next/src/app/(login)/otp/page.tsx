'use client';

import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';
import { useShowModal } from '@/app/ShowModalContext';
import { useFetch } from '@/lib/useFetch';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

const OtpLogin = () => {
  const [token, setToken] = useState<string>('');
  const router = useRouter();
  const alertModal = useShowModal();
  const { statusCodeRef, bodyRef, fetchData } = useFetch<void>({
    autoFetch: false,
    url: 'auth/otp',
    method: 'POST',
    body: JSON.stringify({ token }),
    contentType: 'application/json',
  });
  const socket = useContext(HomeSocketContext);

  const validate = (): boolean => {
    const token_trim = token.trim();
    setToken(token_trim);
    if (token_trim.length === 0) {
      alertModal('토큰 값을 입력해주세요.');
      return false;
    }
    return true;
  };

  const onSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!validate()) return;
    bodyRef.current = JSON.stringify({ token });
    await fetchData();
    if (statusCodeRef?.current === 200) {
      socket.connect();
      router.replace('/');
    }
  };

  return (
    <form>
      <h1 className="text-xl">OTP 값을 입력해주세요.</h1>
      <input
        type="text"
        value={token}
        onChange={e => {
          setToken(e.target.value);
        }}
      />
      <input type="submit" onClick={onSubmit} />
    </form>
  );
};

export default OtpLogin;
