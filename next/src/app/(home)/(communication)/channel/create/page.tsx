'use client';
import Btn from '@/components/btn';
import { useState } from 'react';
import { useFetch } from '@/lib/useFetch';

export default function CreateRoom() {
  const [roomName, setRoomName] = useState('');
  const [password, setPassword] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const { isLoading, dataRef, bodyRef, fetchData } = useFetch({
    autoFetch: false,
    method: 'post',
    url: 'chat',
    contentType: 'application/json',
  });

  async function handleOnSubmit(event: any) {
    event.preventDefault();
    let status;
    if (isPrivate) {
      status = 'private';
    } else if (!password) {
      status = 'public';
    } else {
      status = 'protected';
    }

    const formData = {
      room_name: roomName,
      password: password,
      status: status,
    };
    bodyRef.current = JSON.stringify(formData);
    await fetchData();
  }

  return (
    <form method={'post'}>
      <input
        name={'room_name'}
        value={roomName}
        onChange={event => setRoomName(event.target.value)}
        placeholder={'방 이름'}
      />
      <input
        name={'password'}
        value={password}
        onChange={event => setPassword(event.target.value)}
        placeholder={'비밀번호'}
      />
      <input
        type={'checkbox'}
        title={'status'}
        name={'status'}
        onChange={event => setIsPrivate(event.target.checked)}
      />
      <Btn type={'submit'} title={'방 만들기'} handler={handleOnSubmit} />
    </form>
  );
}
//
