'use client';

import WelcomeMessage from '@/components/welcome';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Nickname from './nickname';
import Avata from './avata';
import { useFetch } from '@/lib/useFetch';

export default function SignUp() {
  const { isLoading, statusCodeRef, bodyRef, fetchData } = useFetch<void>({
    autoFetch: false,
    url: 'auth/create',
    method: 'POST',
    body: FormData,
  });
  const [nickname, setNickname] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const validate = (): boolean => {
    let trim_nickname = nickname.trim();
    setNickname(trim_nickname);
    if (trim_nickname.length === 0) {
      alert('닉네임에 빈 문자열을 입력하면 안됩니다.');
      return false;
    }
    return true;
  };

  const onSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (isLoading) return;
    if (!validate()) return;
    const formData = new FormData();
    formData.append('nickname', nickname);
    if (file) formData.append('avata_path', file);
    bodyRef.current = formData;
    await fetchData();
    if (statusCodeRef?.current === 200) {
      alert('회원가입 성공');
      router.replace('/');
    }
  };

  return (
    <div>
      <WelcomeMessage />
      <form>
        <Nickname
          nickname={nickname}
          setNickname={setNickname}
          validate={validate}
        />
        <Avata file={file} setFile={setFile} />
        <div>
          <input
            type="submit"
            onClick={onSubmit}
            value="제출"
            disabled={isLoading}
          ></input>
        </div>
      </form>
    </div>
  );
}
