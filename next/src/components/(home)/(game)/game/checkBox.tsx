'use client';

import { ChangeEventHandler } from 'react';

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
    <label htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        name={name}
        value={value}
        onChange={onChangeHandler}
      />{' '}
      {title}
    </label>
  );
}
