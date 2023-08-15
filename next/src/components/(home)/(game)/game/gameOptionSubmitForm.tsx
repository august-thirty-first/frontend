'use client';

import Btn from '@/components/btn';
import DifficultySelection from './difficultySelection';
import TypeSelection from './typeSelection';
import React, { useContext, useEffect, useState } from 'react';
import { GameSocketContext } from '@/app/(home)/(game)/createGameSocketContext';
import { useRouter } from 'next/navigation';

export default function GameOptionSubmitForm() {
  const socket = useContext(GameSocketContext);
  const router = useRouter();

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
    socket.on('gameStart', () => {
      router.push('/game');
    });
  }, [socket, router]);

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
