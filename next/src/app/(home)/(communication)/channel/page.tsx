'use client';
import { useContext, useEffect, useState } from "react";
import { HomeSocketContext } from "@/app/(home)/createHomeSocketContext";

export default function Channel() {
  const [value, setValue] = useState('');

  function handleOnSubmit(event: any) {
    event.preventDefault();
    socket.emit('message', value);
    setValue('');
  }

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages([...messages, msg]);
      console.log(messages);
    })
  }, []);

  const socket = useContext(HomeSocketContext);

  const [messages, setMessages] = useState<string[]>([]);

  return (<div><h1>Channel</h1>
    <table>
      <tbody>
      <tr>
        <td>
          {messages.map((message, index) => (
              <div key={index}>
                <span>{message}</span>
              </div>
          ))}
        </td>
      </tr>
      </tbody>
    </table>
    <form onSubmit={handleOnSubmit}>
      <input value={value} onChange={(event) => setValue(event.target.value)}></input>
      <button type="submit">send</button>
    </form>
  </div>);
}
