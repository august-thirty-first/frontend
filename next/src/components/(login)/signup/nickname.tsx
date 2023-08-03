'use client';

import { useRouter } from 'next/navigation';
import Btn from '@/components/btn';
import { Dispatch, SetStateAction } from 'react';
import commonResponse from '@/lib/interface/commonResponse.interface';

interface nicknameProps {
  nickname: string;
  setNickname: Dispatch<SetStateAction<string>>;
}

interface nicknameResponse {
  status: boolean;
}

async function nicknameAPI(
  nickname: string,
): Promise<commonResponse<nicknameResponse>> {
  const backend_url = 'http://localhost:3000/api';
  const result: commonResponse<nicknameResponse> = {};
  try {
    const response = await fetch(`${backend_url}/auth/nickname`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ nickname: nickname.trim() }),
    });
    result.status = response.status;
    if (response.ok) result.data = await response.json();
    else result.error = await response.json();
    return result;
  } catch (error: any) {
    result.error = error;
    return result;
  }
}

const Nickname = ({ nickname, setNickname }: nicknameProps) => {
  const router = useRouter();
  const onHandle = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setNickname(cur => cur.trim());
    const res: commonResponse<nicknameResponse> = await nicknameAPI(nickname);
    if (res.status === 200) {
      if (res.data?.status === true) alert('이미 존재하는 nickname 입니다.');
      else if (res.data?.status === false) alert('OK');
    } else if (res.status === 401) {
      alert('다시 로그인을 해주세요.');
      router.push('/login');
    } else if (res.error) {
      alert(`Error during nickname: ${res.error}`);
      return;
    }
  };

  return (
    <div>
      <label htmlFor="nickname">닉네임</label>
      <br />
      <input
        type="text"
        id="nickname"
        name="nickname"
        value={nickname}
        onChange={event => {
          setNickname(event.target.value);
        }}
      ></input>
      <Btn title="중복검사" handler={onHandle} />
    </div>
  );
};

export default Nickname;
