'use client';

import React, { useState } from 'react';
import CheckBox from './checkBox';

enum MapType {
  Default,
  Crazy,
}

interface ValidateFunction {
  (isSelected: boolean): void;
}

export default function TypeSelection({
  validate,
}: {
  validate: ValidateFunction;
}) {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkBoxes: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      'input[name="mapType"]',
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
        id="mapType_1"
        name="mapType"
        title="default"
        value={MapType.Default}
        onChangeHandler={onChangeHandler}
      />
      <CheckBox
        id="mapType_2"
        name="mapType"
        title="crazy"
        value={MapType.Crazy}
        onChangeHandler={onChangeHandler}
      />
    </div>
  );
}
