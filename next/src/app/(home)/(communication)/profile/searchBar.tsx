'use client';

import { useShowModal } from '@/app/ShowModalContext';
import { useFetch } from '@/lib/useFetch';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useSWR from 'swr';

export enum GameType {
  GENERAL = 'gerneral',
  LADDER = 'ladder',
}

export interface GetGameHistoryDto {
  winner_nickname: string;
  winner_avata: string;
  loser_nickname: string;
  loser_avata: string;
  gameType: GameType;
}

export interface GetAchievementDto {
  title: string;
  description: string;
}

export interface GameDataDto {
  total_win: number;
  total_lose: number;
  ladder: number;
  game_history: GetGameHistoryDto[];
}

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
  achievements: GetAchievementDto[];
  game_data: GameDataDto;
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
  const alertModal = useShowModal();
  const { data, mutate } = useSWR('/searchBar', fetchData);
  const router = useRouter();

  const validate = (): boolean => {
    let trim_nickname = nickname.trim();
    setNickname(trim_nickname);
    if (trim_nickname.length === 0) {
      alertModal('닉네임에 빈 문자열을 입력하면 안됩니다.');
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
      else alertModal('찾을 수 없는 사용자입니다.');
    }
    router.push(`/profile?nickname=${nickname}`);
  };

  useEffect(() => {
    setNickname(myNickname || '');
    if (urlRef?.current) urlRef.current = `profile/user?nickname=${myNickname}`;
    mutate();
  }, [myNickname, mutate, urlRef]);

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
