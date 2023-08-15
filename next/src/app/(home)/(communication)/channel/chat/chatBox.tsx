'use client';
import SubmitForm from '@/components/submitForm';
import { useSearchParams } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react';
import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';

export default function ChatBox() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get('roomId');
  const socket = useContext(HomeSocketContext);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');

  useEffect(() => {
    setMessages(prevMessage => []);
  }, [roomId]);

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
    socket.emit('message', { roomId: roomId, inputMessage });
    setInputMessage('');
  }

  function handleOnChange(event: any) {
    setInputMessage(event.target.value);
  }

  return (
    <div>
      <h1>{roomId}</h1>
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
