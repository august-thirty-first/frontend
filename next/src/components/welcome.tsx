'use client';

import { useSearchParams } from 'next/navigation';

export default function WelcomeMessage() {
  const searchParams = useSearchParams();
  const nickname = searchParams.get('intraName');
  return <h1>{nickname}님 안녕하세요 회원가입을 해주세요</h1>;
}
