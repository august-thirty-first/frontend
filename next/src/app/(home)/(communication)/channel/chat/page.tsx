'use client';
import SendMessage from '@/components/(home)/(communication)/channel/sendMessage';
import { useContext, useEffect, useRef, useState } from 'react';
import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';

export default function Chat() {
  const socket = useContext(HomeSocketContext);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.on('message', msg => {
      setMessages(prevMessage => [...prevMessage, msg]);
      console.log(messages);
    });
    // Scroll to the bottom of the message container when messages change
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div>
      <h2>chat</h2>
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
      <SendMessage />
    </div>
  );
}
