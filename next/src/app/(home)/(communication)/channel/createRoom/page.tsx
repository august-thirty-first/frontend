'use client';
import Btn from '@/components/btn';
import { useState } from 'react';
import CheckBox from '@/components/(home)/(game)/game/checkBox';
import commonResponse from '@/lib/interface/commonResponse.interface';

export default function CreateRoom() {
  const [roomName, setRoomName] = useState('');
  const [password, setPassword] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const backend_url = 'http://localhost:3000/api';

  /*
  2. 패스워드가 있든 없든 checkbox가 체크됐으면 private
  1. 패스워드가 없으면 public
  3. 패스워드가 있으면 proctected
   */
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
    const result: commonResponse<void> = {};
    try {
      const response = await fetch(`${backend_url}/chat`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      result.status = response.status;
      if (!response.ok) result.errorData = await response.json();
      return result;
    } catch (error: any) {
      result.error = error.message;
      return result;
    }
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
