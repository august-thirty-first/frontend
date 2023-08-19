'use client';

import { useFetch } from '@/lib/useFetch';
import SearchBar, { searchProfileResponse } from './searchBar';
import Info from './info';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Btn from '@/components/btn';
import { useState } from 'react';
import FriendBtn from './_friend/friendBtn';

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
  const [profile, setProfile] = useState<searchProfileResponse>();
  const isMyProfile = profile?.nickname === dataRef?.current?.nickname;

  if (isLoading) return <p>Loading...</p>;
  if (errorRef?.current || errorDataRef?.current) return <p>error....</p>;
  return (
    <div className="p-7 max-w-3xl">
      <SearchBar
        myNickname={nickname_params || dataRef?.current?.nickname}
        setProfile={setProfile}
      />
      <div className="pt-5 border p-6">
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
    </div>
  );
};

export default ProfilePage;
