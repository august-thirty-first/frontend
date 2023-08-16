'use client';

import { useFetch } from '@/lib/useFetch';
import Image from 'next/image';
import defaultImg from '@/public/default.png';
import Btn from './btn';
import useSWR from 'swr';

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
    compare: (a, b) => JSON.stringify(a) === JSON.stringify(b),
  });
  return (
    <div className="max-w-2xl border-4">
      친구 목록
      {data && (
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {data &&
            data.map(friend => (
              <li className="py-3 sm:py-4" key={friend.nickname}>
                <div className="flex items-center space-x-4">
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
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {friend.nickname}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {friend.status}
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <Btn title="DM" />
                    <Btn title="PLAY" />
                  </div>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
