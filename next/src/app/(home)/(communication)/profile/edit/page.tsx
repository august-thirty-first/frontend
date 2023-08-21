'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Otp from './otp';
import Avata from '@/app/(login)/signup/avata';
import EditNickname from './nickname';
import { useFetch } from '@/lib/useFetch';
import Btn from '@/components/btn';

const Edit = () => {
  const { isLoading, statusCodeRef, bodyRef, fetchData } = useFetch<void>({
    autoFetch: false,
    url: 'profile/edit',
    method: 'PATCH',
    body: FormData,
  });
  const [nickname, setNickname] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const validate = (): boolean => {
    let trim_nickname = nickname.trim();
    setNickname(trim_nickname);
    if (trim_nickname.length === 0 && !file) {
      alert('변경하실 닉네임 또는 사진을 넣어주세요.');
      return false;
    }
    return true;
  };

  const onSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (isLoading) return;
    if (!validate()) return;
    const formData = new FormData();
    formData.append('nickname', nickname.trim());
    if (file) formData.append('avata_path', file);
    bodyRef.current = formData;
    await fetchData();
    if (statusCodeRef?.current === 204) {
      alert('수정 완료');
      router.replace('/profile');
    }
  };

  return (
    <div className="m-7 p-7 border max-w-3xl">
      <div className="mb-5">
        <EditNickname
          nickname={nickname}
          setNickname={setNickname}
          validate={validate}
        />
      </div>
      <Avata file={file} setFile={setFile} />
      <div className="my-5">
        <label>OTP 설정</label>
        <Otp />
      </div>
      <div className="flex">
        <div className="mr-4">
          <Btn
            color="gray"
            handler={() => {
              router.back();
            }}
            title="뒤로 가기"
          />
        </div>
        <Btn
          color="cyan"
          handler={onSubmit}
          title="제출"
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default Edit;
