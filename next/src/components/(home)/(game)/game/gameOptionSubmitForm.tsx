'use client';

import Btn from '@/components/btn';
import DifficultySelection from './difficultySelection';
import TypeSelection from './typeSelection';
import React, { useState } from 'react';

export default function GameOptionSubmitForm() {
  const [isTypeSelected, setIsTypeSelected] = useState<boolean>(false);
  const [isDifficultySelected, setIsDifficultySelected] =
    useState<boolean>(false);
  const submitHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(event);
  };

  const typeValidateHandler = (isSelected: boolean): void => {
    setIsTypeSelected(isSelected);
  };

  const difficultyValidateHandler = (isSelected: boolean): void => {
    setIsDifficultySelected(isSelected);
  };

  return (
    <div>
      <form>
        <TypeSelection validate={typeValidateHandler} />
        <DifficultySelection validate={difficultyValidateHandler} />
        <Btn
          type="submit"
          title="submit"
          handler={submitHandler}
          disabled={!isTypeSelected || !isDifficultySelected}
        />
      </form>
    </div>
  );
}
