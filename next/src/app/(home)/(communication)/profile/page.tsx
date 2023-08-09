'use client';

import { useFetch } from '@/lib/useFetch';
import SearchBar, { searchProfileResponse } from './searchBar';
import Info from './info';
import Link from 'next/link';
import Btn from '@/components/btn';
import { useState } from 'react';

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
  const [profile, setProfile] = useState<searchProfileResponse>();
  const isMyProfile = profile?.nickname === dataRef?.current?.nickname;

  if (isLoading) return <p>Loading...</p>;
  if (errorRef?.current || errorDataRef?.current) return <p>error....</p>;
  return (
    <div>
      <SearchBar
        myNickname={dataRef?.current?.nickname}
        setProfile={setProfile}
      />
      <div>
        <Info profile={profile} />
        {isMyProfile && (
          <Link href="/profile/edit">
            <Btn title="수정" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
