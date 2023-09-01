'use client';

import { useFetch } from '@/lib/useFetch';
import defaultImg from '@/public/default.png';
import useSWR from 'swr';
import Image from 'next/image';
import { searchUserRequestStatus } from '@/app/(home)/(communication)/profile/searchBar';
import FriendBtn from '@/app/(home)/(communication)/profile/_friend/friendBtn';
import ProfileBtn from './profileBtn';

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
    compare: (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b),
  });
  return (
    <div className="h-96 border-4 mt-4 mr-2">
      <p className="inline text-center text-xl border-4 m-0 p-0">알람 목록</p>
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
                <div className="flex-1 min-w-1 items-center">
                  <p className="text-sm font-medium text-gray-900 truncate mt-1 mb-1 ml-1">
                    {friend.nickname}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 m-0">
                  <ProfileBtn nickname={friend.nickname} />
                  <FriendBtn id={friend.id} status={friend.status} />
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
