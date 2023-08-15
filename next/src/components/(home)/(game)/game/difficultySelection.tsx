'use client';

import React from 'react';
import CheckBox from './checkBox';

export enum Difficulty {
  Easy,
  Hard,
}

interface ValidateFunction {
  (isSelected: boolean): void;
}

export default function DifficultySelection({
  validate,
}: {
  validate: ValidateFunction;
}) {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkBoxes: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      'input[name="mapDifficulty"]',
    );
    let trueCount = 0;
    checkBoxes.forEach(checkBox => {
      if (checkBox !== event.target) {
        checkBox.checked = false;
      }
      if (checkBox.checked == true) {
        trueCount++;
      }
    });
    if (trueCount === 1) {
      validate(true);
    } else {
      validate(false);
    }
  };

  return (
    <div>
      <h3>Select Map</h3>
      <CheckBox
        id="mapDifficulty_1"
        name="mapDifficulty"
        title="easy"
        value={Difficulty.Easy}
        onChangeHandler={onChangeHandler}
      />
      <CheckBox
        id="mapDifficulty_2"
        name="mapDifficulty"
        title="hard"
        value={Difficulty.Hard}
        onChangeHandler={onChangeHandler}
      />
    </div>
  );
}
