import { ChangeEventHandler, FormEventHandler } from 'react';
import Btn from './btn';

export default function ChatSubmitForm({
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
    <form
      onSubmit={handleOnSubmit}
      className="flex items-center border  rounded p-2"
    >
      <input
        value={value}
        onChange={handleOnChange}
        className="mr-2 py-1 px-2 border border-gray-300 rounded flex-grow"
      />
      <Btn title={title} type="submit" />
    </form>
  );
}
