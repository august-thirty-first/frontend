'use client';

import { searchProfileResponse } from './searchBar';
import Image from 'next/image';
import defaultImg from '@/public/default.png';

interface InfoProps {
  profile: searchProfileResponse | undefined;
}

const Info = ({ profile }: InfoProps) => {
  return (
    <>
      {profile && (
        <>
          <label htmlFor="nickname">nickname</label>
          <input
            id="nickname"
            type="text"
            disabled={true}
            value={profile.nickname}
          />
          <label>Image</label>
          <Image
            width="200"
            height="200"
            className="h-36 w-auto"
            src={
              profile.avata_path
                ? `http://nestjs:3000/${profile.avata_path}`
                : defaultImg
            }
            alt="avatar"
          />
        </>
      )}
    </>
  );
};

export default Info;
