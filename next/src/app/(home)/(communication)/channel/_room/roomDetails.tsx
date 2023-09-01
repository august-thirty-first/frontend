import React, { useRef, useEffect } from 'react';
import ChatRoom, { RoomStatus } from '@/interfaces/chatRoom.interface';
import { useRouter } from 'next/navigation';
import { useFetch } from '@/lib/useFetch';
import ChatParticipant from '@/interfaces/chatParticipant.interface';
import Btn from '@/components/btn';
import { mutate } from 'swr';
import useToast from '@/components/toastContext';

export default function RoomDetails({
  room,
  joinAPI,
  onClose,
}: {
  room: ChatRoom;
  joinAPI: string;
  onClose: () => void;
}) {
  const router = useRouter();
  const { isLoading, statusCodeRef, dataRef, bodyRef, fetchData } =
    useFetch<ChatParticipant>({
      autoFetch: false,
      method: 'POST',
      contentType: 'application/json',
      url: joinAPI,
    });
  const toast = useToast();

  async function joinRoom(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const password = new FormData(event.currentTarget).get('password');

    bodyRef.current = JSON.stringify({
      chat_room_id: room.id,
      password: requirePassword ? password : '',
    });

    await fetchData();
    // Todo: 실패 상황일 때 팝업
    if (statusCodeRef?.current !== undefined && statusCodeRef?.current >= 400) {
      toast('방 입장에 실패했습니다.');
      router.push('/channel');
      return null;
    }
    await mutate('myRoomList');
    router.push(`/channel/chat/${room.id}`);
  }

  const requirePassword =
    room.status === RoomStatus.protected || room.status === RoomStatus.private;

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // 클릭 이벤트 핸들러를 document에 등록하여 클릭 이벤트를 처리합니다.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const targetNode = event.target as Node; // event.target의 타입을 명시적으로 지정
      if (dropdownRef.current && !dropdownRef.current.contains(targetNode)) {
        onClose(); // 드롭다운 메뉴를 닫습니다.
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="bg-white p-2 rounded-md shadow">
      <div className="flex justify-center mt-2">
        <form onSubmit={joinRoom} className={requirePassword ? 'w-36' : 'w-24'}>
          {requirePassword && (
            <>
              <label htmlFor={'password'}>비밀번호 입력</label>
              <input name={'password'} />
            </>
          )}
          <Btn title={'입장'} type={'submit'} />
        </form>
      </div>
    </div>
  );
}
