'use client';
import { useContext, useEffect, useState } from 'react';
import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';
import { useRouter } from 'next/navigation';
import { useFetch } from '@/lib/useFetch';
import ChatRoom from '@/interfaces/chatRoom.interface';
import GetRoomList from '@/app/(home)/(communication)/channel/_room/getRoomList';

export default function ChatRoomList() {
  return (
    <div>
      <h2> 전체 채팅방 목록 </h2>
      <GetRoomList url={'chat'} />
    </div>
  );
}
