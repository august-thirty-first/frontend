'use client';
import Btn from '@/components/btn';
import { useFetch } from '@/lib/useFetch';
import { useState } from 'react';
import Modal from '@/components/modal/Modal';

export default function RoomCreate() {
  const [showModal, setShowModal] = useState(false);
  const { isLoading, bodyRef, statusCodeRef, fetchData } = useFetch<void>({
    autoFetch: false,
    method: 'POST',
    url: `chat`,
    contentType: 'application/json',
  });

  function toggleModal() {
    console.log(showModal);
    setShowModal(!showModal);
  }

  async function createRoom(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const roomName = formData.get('room_name');
    const password = formData.get('password');
    const isPrivate = formData.get('is_private') === 'on';

    let status;
    if (isPrivate) {
      status = 'private';
    } else if (!password) {
      status = 'public';
    } else {
      status = 'protected';
    }

    bodyRef.current = JSON.stringify({
      room_name: roomName,
      password: password,
      status: status,
    });

    await fetchData();

    if (isLoading) return <Btn title={'방 생성중...'} />;

    // Todo: 기존에 방에 참여하고 있었던 사용자에 대한 처리 필요
    if (statusCodeRef?.current === 200) {
      alert('방 생성 완료');
    } else {
      alert('방 생성 실패');
    }
  }

  return (
    <div>
      <Btn title={'방 생성'} handler={toggleModal} />
      {showModal && (
        <Modal closeModal={toggleModal}>
          <form onSubmit={createRoom}>
            <label htmlFor="room_name">방 이름</label>
            <input name={'room_name'} />

            <label htmlFor="password">비밀번호</label>
            <input name={'password'} />

            <label htmlFor="is_private">비밀방</label>
            <input type={'checkbox'} name={'is_private'} />
            <Btn title={'전송'} type={'submit'} />
          </form>
        </Modal>
      )}
    </div>
  );
}