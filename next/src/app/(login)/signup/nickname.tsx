'use client';

import Btn from '@/components/btn';
import { Dispatch, SetStateAction } from 'react';
import { useFetch } from '@/lib/useFetch';

interface nicknameResponse {
  status: boolean;
}

interface nicknameProps {
  nickname: string;
  setNickname: Dispatch<SetStateAction<string>>;
  validate: () => boolean;
}

const Nickname = ({ nickname, setNickname, validate }: nicknameProps) => {
  const { statusCodeRef, bodyRef, fetchData, dataRef } =
    useFetch<nicknameResponse>({
      autoFetch: false,
      url: 'auth/nickname',
      method: 'POST',
      body: JSON.stringify({ nickname }),
      contentType: 'application/json',
    });

  const onHandle = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!validate()) return;
    bodyRef.current = JSON.stringify({ nickname });
    await fetchData();
    if (statusCodeRef?.current === 200) {
      if (dataRef?.current?.status === true)
        alert('이미 존재하는 nickname 입니다.');
      else alert('OK');
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
