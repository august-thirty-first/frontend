'use client';
import { useContext, useEffect, useRef, useState } from 'react';
import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';
import { useSearchParams } from 'next/navigation';
import SubmitForm from '@/components/submitForm';

export default function Chat() {
  const socket = useContext(HomeSocketContext);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const roomName = searchParams.get('roomId');
  const [inputMessage, setInputMessage] = useState<string>('');

  useEffect(() => {
    setMessages(prevMessage => []);
  }, [roomName]);

  useEffect(() => {
    socket.on('message', msg => {
      setMessages(prevMessage => [...prevMessage, msg]);
      console.log(`'message' : ${msg}`);
    });
  }, []);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  function handleOnSubmit(event: any) {
    event.preventDefault();
    setMessages(prevMessages => [...prevMessages, `You: ${inputMessage}`]);
    socket.emit('message', { roomName, inputMessage });
    setInputMessage('');
  }

  function handleOnChange(event: any) {
    setInputMessage(event.target.value);
  }

  return (
    <div>
      <h1>{roomName}</h1>
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
      <SubmitForm
        title="send"
        handleOnSubmit={handleOnSubmit}
        value={inputMessage}
        handleOnChange={handleOnChange}
      />
    </div>
  );
}
