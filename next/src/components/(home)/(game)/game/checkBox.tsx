'use client';

import { ChangeEventHandler, useState } from 'react';

export default function CheckBox({
  id,
  title,
  name,
  value,
  onChangeHandler,
}: {
  id: string;
  title: string;
  name: string;
  value: number;
  onChangeHandler: ChangeEventHandler;
}) {
  return (
    <div>
      <label htmlFor={id} className={`flex justify-center`}>
        <input
          id={id}
          type="checkbox"
          name={name}
          value={value}
          onChange={onChangeHandler}
          // style={{ display: 'none' }}
        />{' '}
        {title}
      </label>
    </div>
  );
}
