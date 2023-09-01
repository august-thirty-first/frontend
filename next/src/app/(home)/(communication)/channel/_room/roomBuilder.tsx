'use client';
import Btn from '@/components/btn';
import { useFetch } from '@/lib/useFetch';
import { useState } from 'react';
import Modal from '@/components/modal/Modal';
import ChatRoom from '@/interfaces/chatRoom.interface';
import { useRouter } from 'next/navigation';
import useToast from '@/components/toastContext';
import { mutate } from 'swr';

export default function RoomBuilder({
  title,
  method,
  url,
}: {
  title: string;
  method: string;
  url: string;
}) {
  const router = useRouter();
  const toast = useToast();
  const [showModal, setShowModal] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const { isLoading, bodyRef, statusCodeRef, dataRef, fetchData } =
    useFetch<ChatRoom>({
      autoFetch: false,
      method: method,
      url: url,
      contentType: 'application/json',
    });

  function toggleModal() {
    setShowModal(!showModal);
  }

  async function buildRoom(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const roomName = formData.get('room_name');
    const password = formData.get('password');
    const isPrivate = formData.get('is_private') === 'on';

    let status;
    if (isPrivate) {
      status = 'private';
    } else if (password) {
      status = 'protected';
    } else {
      status = 'public';
    }

    bodyRef.current = JSON.stringify({
      room_name: roomName,
      password: password,
      status: status,
    });

    await fetchData();

    if (isLoading) return <Btn title={'방 생성중...'} />;

    /*
    Todo: 기존에 방에 참여하고 있었던 사용자에 대한 처리 필요
    Todo: 성공과 실패 잠깐 띄웠다가 사라지게 하는 박스로 만들면 좋을것같음
    Todo: 성공했으면 반환된 채팅방에 redirect
     */
    if (statusCodeRef?.current === 200 || statusCodeRef?.current === 201) {
      await mutate('allRoomList');
      await mutate('myRoomList');
      toast('방 생성 성공');
    } else {
      toast('방 생성 실패');
    }
    toggleModal();
  }

  return (
    <div>
      <Btn title={title} handler={toggleModal} />
      {showModal && (
        <Modal closeModal={toggleModal}>
          <form onSubmit={buildRoom}>
            <label htmlFor="room_name">방 이름</label>
            <input name={'room_name'} />

            <label htmlFor="password">비밀번호</label>
            <input
              name={'password'}
              value={inputPassword}
              onChange={event => setInputPassword(event.target.value)}
            />
            <label htmlFor="is_private">비밀방</label>
            <input type={'checkbox'} name={'is_private'} />
            <Btn title={'전송'} type={'submit'} />
          </form>
        </Modal>
      )}
    </div>
  );
}
