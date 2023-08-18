'use client';

import Btn from '@/components/btn';
import React, { useContext } from 'react';
import { GameSocketContext } from '../../createGameSocketContext';
import { useRouter } from 'next/navigation';

export default function CancleMatchBtn() {
  const gameSocket = useContext(GameSocketContext);
  const router = useRouter();
  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    gameSocket.disconnect();
    router.push('/profile');
  };
  return (
    <>
      <Btn type="button" title="대기열에서 나가기" handler={onClickHandler} />
    </>
  );
}
