'use client';

import Btn from '@/components/btn';
import DifficultySelection from './difficultySelection';
import TypeSelection from './typeSelection';
import React, { useContext, useEffect, useState } from 'react';
import { GameSocketContext } from '@/app/(home)/(game)/createGameSocketContext';
import { useRouter } from 'next/navigation';
import { useModal } from '@/app/(home)/(game)/modalProvider';

export default function GameOptionSubmitForm() {
  const socket = useContext(GameSocketContext);
  const router = useRouter();
  const { openModal } = useModal();

  const [isTypeSelected, setIsTypeSelected] = useState<boolean>(false);
  const [isDifficultySelected, setIsDifficultySelected] =
    useState<boolean>(false);
  const [buttonTitle, setButtonTitle] = useState<string>('Ready?');

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    let obj: any = {};
    formData.forEach((value, key) => {
      obj[key] = value;
    });
    const stringedJson = JSON.stringify(obj);
    socket.emit('ready', stringedJson);
    setButtonTitle('Ready!');
  };

  const typeValidateHandler = (isSelected: boolean): void => {
    setIsTypeSelected(isSelected);
  };

  const difficultyValidateHandler = (isSelected: boolean): void => {
    setIsDifficultySelected(isSelected);
  };

  useEffect(() => {
    const gameStartListener = () => {
      router.push('/game');
    };
    socket.on('gameStart', gameStartListener);

    //중간에 상대방 소켓이 끊어졌을 때 모달창을 띄운다
    const gameOverInOptionPageListener = () => {
      openModal('상대방이 떠났습니다..');
    };
    socket.on('gameOverInOptionPage', gameOverInOptionPageListener);

    return () => {
      socket.off('gameStart', gameStartListener);
      socket.off('gameOverInOptionPage', gameOverInOptionPageListener);
    };
  }, []);

  return (
    <div>
      <form onSubmit={submitHandler}>
        <TypeSelection validate={typeValidateHandler} />
        <DifficultySelection validate={difficultyValidateHandler} />
        <Btn
          type="submit"
          title={buttonTitle}
          disabled={!isTypeSelected || !isDifficultySelected}
        />
      </form>
    </div>
  );
}
