'use client';
import RedirectBtn from '@/components/redirectBtn';
import React, { useContext, useEffect } from 'react';
import { GameSocketContext } from '../(game)/createGameSocketContext';

export default function LadderBtn() {
  const gameSocket = useContext(GameSocketContext);
  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    gameSocket.emit('joinQueue');
  };
  return (
    <RedirectBtn
      title="래더 게임 참여"
      redirectUrl="/game/ladder"
      handler={clickHandler}
    />
  );
}
