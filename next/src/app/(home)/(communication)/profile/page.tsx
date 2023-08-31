'use client';

import { useFetch } from '@/lib/useFetch';
import SearchBar, { searchProfileResponse } from './searchBar';
import Info from './info';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Btn from '@/components/btn';
import { useState, useEffect } from 'react';
import FriendBtn from './_friend/friendBtn';
import Achievements from './achievements';
import MatchHistory from './matchHistory';

interface myInfoResponse {
  nickname: string;
  avata_path: string;
  has_otp_key: boolean;
}

const ProfilePage = () => {
  const { isLoading, errorDataRef, errorRef, dataRef } =
    useFetch<myInfoResponse>({
      autoFetch: true,
      url: 'profile/me',
      method: 'GET',
    });
  const nickname_params = useSearchParams().get('nickname');
  const [nickname, setNickname] = useState<string | null>(nickname_params);
  const [profile, setProfile] = useState<searchProfileResponse>();
  const isMyProfile = profile?.nickname === dataRef?.current?.nickname;

  useEffect(() => {
    setNickname(nickname_params);
  }, [nickname_params]);

  if (isLoading) return <p>Loading...</p>;
  if (errorRef?.current || errorDataRef?.current) return <p>error....</p>;
  return (
    <div className="p-7 grid grid-cols-2 grid-rows-2 gap-2 w-4/5 grid-rows-1">
      <div className="">
        <SearchBar
          myNickname={nickname || dataRef?.current?.nickname}
          setProfile={setProfile}
        />
      </div>
      <div className="row-start-2 row-end-2 col-start-1 col-end-1">
        <Info profile={profile} />
        {isMyProfile && (
          <Link href="/profile/edit">
            <Btn title="수정" />
          </Link>
        )}
        {!isMyProfile && profile && (
          <FriendBtn id={profile.id} status={profile.friend_status} />
        )}
      </div>
      <hr />
      <MatchHistory
        gameData={profile?.game_data}
        profileName={profile?.nickname}
      />
      <hr />
      <Achievements achievements={profile?.achievements} />
    </div>
  );
};

export default ProfilePage;
