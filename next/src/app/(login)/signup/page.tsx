'use client';

import WelcomeMessage from '@/components/welcome';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Nickname from '@/components/(login)/signup/nickname';
import Avata from '@/components/(login)/signup/avata';
import commonResponse from '@/lib/interface/commonResponse.interface';

async function signUpAPI(formData: FormData): Promise<commonResponse<void>> {
  const result: commonResponse<void> = {};
  const backend_url = 'http://localhost:3000/api';
  try {
    const response = await fetch(`${backend_url}/auth/create`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });
    result.status = response.status;
    if (!response.ok) result.errorData = await response.json();
    return result;
  } catch (error: any) {
    result.error = error.message;
    return result;
  }
}

export default function SignUp() {
  const [nickname, setNickname] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
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
    if (isSending) return;
    if (!validate()) return;
    setIsSending(true);
    const formData = new FormData();
    formData.append('nickname', nickname);
    if (file) formData.append('avata_path', file);
    const res: commonResponse<void> = await signUpAPI(formData);
    if (res.error) alert(`Error during nickname: ${res.error}`);
    else if (res.status === 200) {
      alert('회원가입 성공');
      router.replace('/');
    } else if (res.status === 401) {
      alert('다시 로그인을 해주세요.');
      router.push('/login');
    } else {
      alert(res.errorData?.message);
    }
    setIsSending(false);
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
            disabled={isSending}
          ></input>
        </div>
      </form>
    </div>
  );
}
