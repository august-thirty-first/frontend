'use client';

import { useFetch } from '@/lib/useFetch';
import Image from 'next/image';
import defaultImg from '@/public/default.png';
import useSWR from 'swr';
import ProfileBtn from './profileBtn';
import PlayGameBtn from './playGameBtn';

export enum FriendStatus {
  Online = 'online',
  Offline = 'offline',
  Gaming = 'gaming',
}

interface friendGetResponse {
  nickname: string;
  id: number;
  avata_path: string | null;
  status: FriendStatus;
}

export default function Friends() {
  const { fetchData } = useFetch<friendGetResponse[]>({
    autoFetch: false,
    url: 'friend',
    method: 'GET',
  });
  const { data } = useSWR('/friend', fetchData, {
    refreshInterval: 5000,
    compare: (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b),
  });
  return (
    <div className="h-96 border-4 mr-2">
      <p className="inline text-center text-xl border-4 m-0 p-0">친구 목록</p>
      <ul
        role="list"
        className="divide-y divide-gray-200 max-h-80 overflow-y-auto"
      >
        {data &&
          data.map((friend: any) => (
            <li className="py-3 sm:py-4" key={friend.nickname}>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Image
                    width="200"
                    height="200"
                    className="h-8 w-8 rounded-full"
                    src={
                      friend.avata_path
                        ? `http://nestjs:3000/${friend.avata_path}`
                        : defaultImg
                    }
                    alt="avatar"
                  />
                </div>
                <div className="flex-1 min-w-0 items-center">
                  <p className="text-sm font-medium text-gray-900 truncate mt-1 mb-1 ml-1">
                    {friend.nickname}
                  </p>
                  <p className="text-sm text-gray-500 truncate mt-1 mb-1 ml-1">
                    {friend.status}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 m-0">
                  <ProfileBtn nickname={friend.nickname} />
                  {friend.status === FriendStatus.Online && (
                    <PlayGameBtn nickname={friend.nickname} />
                  )}
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
