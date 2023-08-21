'use client';

import Btn from '@/components/btn';
import { Dispatch, SetStateAction } from 'react';
import { useFetch } from '@/lib/useFetch';
import { useShowModal } from '@/app/ShowModalContext';

interface nicknameProps {
  nickname: string;
  setNickname: Dispatch<SetStateAction<string>>;
  validate: () => boolean;
}

interface nicknameResponse {
  status: boolean;
}

const EditNickname = ({ nickname, setNickname, validate }: nicknameProps) => {
  const { statusCodeRef, dataRef, bodyRef, fetchData } =
    useFetch<nicknameResponse>({
      autoFetch: false,
      url: 'profile/nickname',
      method: 'POST',
      body: JSON.stringify({ nickname }),
      contentType: 'application/json',
    });
  const alertModal = useShowModal();

  const onHandle = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!validate()) return;
    bodyRef.current = JSON.stringify({ nickname });
    await fetchData();
    if (statusCodeRef?.current === 200 && dataRef?.current) {
      if (dataRef?.current.status === true)
        alertModal('이미 존재하는 nickname 입니다.');
      else alertModal('OK');
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
        placeholder="new nickname"
        value={nickname}
        onChange={event => {
          setNickname(event.target.value);
        }}
      ></input>
      <Btn title="중복검사" handler={onHandle} />
    </div>
  );
};

export default EditNickname;
