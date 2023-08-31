'use client';

import React, { useEffect, useState } from 'react';
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
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  useEffect(() => {
    if (selectedIndex !== -1) {
      validate(true);
    } else {
      validate(false);
    }
  }, [selectedIndex]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkBoxes: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      'input[name="mapType"]',
    );

    checkBoxes.forEach((checkBox, index) => {
      if (checkBox === event.target && checkBox.checked == true) {
        setSelectedIndex(index);
      } else {
        checkBox.checked = false;
      }
      if (checkBox === event.target && checkBox.checked == false) {
        setSelectedIndex(-1);
      }
    });
  };

  return (
    <div className="flex flex-row w-100 p-5 rounded cursor-pointer bg-gray-200">
      <fieldset className="w-40">
        <legend className="flex items-center justify-center h-full text-center text-2xl font-bold">
          맵
        </legend>
      </fieldset>
      <div className="flex flex-raw items-center justify-center">
        <div
          className={`p-3 mr-2 rounded cursor-pointer transition-colors ${
            selectedIndex === 0 ? `bg-blue-600` : `bg-gray-300`
          } text-white`}
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
          className={`p-3 rounded cursor-pointer transition-colors ${
            selectedIndex === 1 ? `bg-blue-600` : `bg-gray-300`
          } text-white`}
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
