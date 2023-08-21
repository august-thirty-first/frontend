'use client';

import { useFetch } from '@/lib/useFetch';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useSWR from 'swr';

export enum searchUserRequestStatus {
  Allow = 'allow',
  SendRequest = 'send',
  RecvRequest = 'recv',
}

export interface searchProfileResponse {
  id: number;
  nickname: string;
  avata_path: string;
  friend_status: searchUserRequestStatus;
}

export interface searchBarProps {
  myNickname: string | undefined;
  setProfile: Dispatch<SetStateAction<searchProfileResponse | undefined>>;
}

const SearchBar = ({ myNickname, setProfile }: searchBarProps) => {
  const [nickname, setNickname] = useState<string>(myNickname || '');
  const { statusCodeRef, fetchData, dataRef, urlRef } =
    useFetch<searchProfileResponse>({
      autoFetch: false,
      url: `profile/user?nickname=${nickname}`,
      method: 'GET',
    });
  const { data } = useSWR('/searchBar', fetchData);

  const validate = (): boolean => {
    let trim_nickname = nickname.trim();
    setNickname(trim_nickname);
    if (trim_nickname.length === 0) {
      alert('닉네임에 빈 문자열을 입력하면 안됩니다.');
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    if (!validate()) return;
    if (urlRef?.current) urlRef.current = `profile/user?nickname=${nickname}`;
    await fetchData();
    if (statusCodeRef?.current === 200) {
      if (dataRef?.current) setProfile(dataRef.current);
      else alert('찾을 수 없는 사용자입니다.');
    }
  };

  useEffect(() => {
    if (data) setProfile(data);
  }, [data, setProfile]);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <input
        type="text"
        value={nickname}
        onChange={e => setNickname(e.target.value)}
        autoFocus={true}
      />
      <input type="submit" value="검색" />
    </form>
  );
};

export default SearchBar;
