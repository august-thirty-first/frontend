'use client';

import { ChangeEventHandler, FormEventHandler } from 'react';
import Btn from './btn';

export default function SubmitForm({
  title,
  handleOnSubmit,
  value,
  handleOnChange,
}: {
  title: React.ReactNode;
  handleOnSubmit: FormEventHandler<HTMLFormElement>;
  value: string;
  handleOnChange?: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <form onSubmit={handleOnSubmit}>
      <input value={value} onChange={handleOnChange} />
      <Btn title={title} type="submit" />
    </form>
  );
}
