'use client';

import Btn from '@/components/btn';
import WelcomeMessage from '@/components/welcome';
import { useState } from 'react';

export default function SignUp() {
  const [nickName, setNickName] = useState('');
  const onHandle = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'http://localhost:3000/api/auth/nickname',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nickname: nickName,
          }),
        },
      );
      const data = await response.json();
      if (data.status === true) {
        alert('중복임');
      }
      // console.log(response.json());
    } catch (error) {
      console.log('error occure');
      console.log(error);
    }
  };
  return (
    <div>
      <WelcomeMessage />
      <form
        action={`http://localhost:3000/api/auth/create`}
        method="POST"
        encType="multipart/form-data"
      >
        <div>
          <label htmlFor="nickname">닉네임</label>
          <br />
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={nickName}
            onChange={event => {
              setNickName(event.target.value);
            }}
          ></input>
          <Btn title="중복검사" handler={onHandle} />
        </div>
        <div>
          <label htmlFor="avata_path">아바타 사진</label>
          <br />
          <input type="file" name="avata_path" id="avata_path"></input>
        </div>
        <div>
          <input type="submit" value="제출"></input>
        </div>
      </form>
    </div>
  );
}
