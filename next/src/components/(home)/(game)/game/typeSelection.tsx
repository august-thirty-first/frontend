'use client';

import React, { useState } from 'react';
import CheckBox from './checkBox';

export enum MapType {
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
    <div className={`p-5 rounded cursor-pointer bg-blue-50`}>
      <h3 className="text-center text-2xl font-bold pt-5 pb-5">맵</h3>
      <div className="flex items-center justify-center">
        <div
          className={`p-3 mx-5 rounded cursor-pointer transition-colors bg-blue-600 text-white`}
        >
          <CheckBox
            id="mapType_1"
            name="mapType"
            title="기본"
            value={MapType.Default}
            onChangeHandler={onChangeHandler}
          />
        </div>
        <div
          className={`p-3 mx-5 rounded cursor-pointer transition-colors bg-blue-600 text-white`}
        >
          <CheckBox
            id="mapType_2"
            name="mapType"
            title="CRAZY"
            value={MapType.Crazy}
            onChangeHandler={onChangeHandler}
          />
        </div>
      </div>
    </div>
  );
}
