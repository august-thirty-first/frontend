'use client';

import Btn from '@/components/btn';
import DifficultySelection, { Difficulty } from './difficultySelection';
import TypeSelection, { MapType } from './typeSelection';
import React, { useContext, useState } from 'react';
import { useFetch } from '@/lib/useFetch';
import { GameSocketContext } from '@/app/(home)/(game)/createGameSocketContext';

interface gameOptionResponse {
  map: MapType;
  difficulty: Difficulty;
}

export default function GameOptionSubmitForm() {
  const socket = useContext(GameSocketContext);

  const { statusCodeRef, bodyRef, fetchData, dataRef } =
    useFetch<gameOptionResponse>({
      autoFetch: false,
      url: 'game/option',
      method: 'POST',
      // contentType: 'application/json',
      // contentType: 'multipart/form-data',
      body: FormData,
    });

  const [isTypeSelected, setIsTypeSelected] = useState<boolean>(false);
  const [isDifficultySelected, setIsDifficultySelected] =
    useState<boolean>(false);
  const [buttonTitle, setButtonTitle] = useState<string>('Ready?');

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // let obj: any = {};
    // formData.forEach((value, key) => {
    //   obj[key] = value;
    // });
    // const json = JSON.stringify(obj);
    // bodyRef.current = json;

    bodyRef.current = formData;
    await fetchData();

    if (statusCodeRef?.current === 201) {
      if (dataRef?.current) {
        socket.emit('ready', dataRef.current); //내 소켓 이름으로 보내준다
        setButtonTitle('Ready!');
      } else alert('에러');
    }
  };

  const typeValidateHandler = (isSelected: boolean): void => {
    setIsTypeSelected(isSelected);
  };

  const difficultyValidateHandler = (isSelected: boolean): void => {
    setIsDifficultySelected(isSelected);
  };

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
