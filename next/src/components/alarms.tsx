'use client';

import { useFetch } from '@/lib/useFetch';
import defaultImg from '@/public/default.png';
import useSWR from 'swr';
import Image from 'next/image';
import { searchUserRequestStatus } from '@/app/(home)/(communication)/profile/searchBar';
import FriendBtn from '@/app/(home)/(communication)/profile/_friend/friendBtn';

export interface FriendRequestingAlarmsResponse {
  id: number;
  nickname: string;
  avata_path: string;
  status: searchUserRequestStatus;
}

export default function Alarms() {
  const { fetchData } = useFetch<FriendRequestingAlarmsResponse[]>({
    autoFetch: false,
    url: 'friend/alarms',
    method: 'GET',
  });
  const { data } = useSWR('/alarms', fetchData, {
    refreshInterval: 5000,
    compare: (a, b) => JSON.stringify(a) === JSON.stringify(b),
  });
  return (
    <div className="max-w-2xl border-4">
      알람 목록
      <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
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
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  <FriendBtn id={friend.id} status={friend.status} />
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
