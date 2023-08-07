'use client';
import { useRef, useContext, useEffect, useState } from 'react';
import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';

export default function Channel() {
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const socket = useContext(HomeSocketContext);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  function handleOnSubmit(event: any) {
    event.preventDefault();
    setMessages(prevMessages => [...prevMessages, `You: ${value}`]);
    socket.emit('message', value);
    setValue('');
  }

  useEffect(() => {
    socket.on('message', msg => {
      setMessages(prevMessages => [...prevMessages, msg]);
    });
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the message container when messages change
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div>
      <h1>Channel</h1>
      <div
        ref={messageContainerRef}
        style={{ width: '100%', height: '200px', overflow: 'auto' }}
      >
        {messages.map((message, index) => (
          <div key={index}>
            <span>{message}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleOnSubmit}>
        <input value={value} onChange={event => setValue(event.target.value)} />
        <button type="submit">send</button>
      </form>
    </div>
  );
}
