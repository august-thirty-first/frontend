'use client';
import { useRef, useContext, useEffect, useState } from 'react';
import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';

export default function Channel() {
  const [value, setValue] = useState('');
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [room, setRoom] = useState('');
  const socket = useContext(HomeSocketContext);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  function handleOnSubmit(event: any) {
    event.preventDefault();
    setMessages(prevMessages => [...prevMessages, `You: ${value}`]);
    socket.emit('message', { roomName, value });
    setValue('');
  }

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages((prevMessage) => [...prevMessage, msg]);
      console.log(messages);
    });
    socket.on('roomChange', (room) => {
      setRoom(room);
    });
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the message container when messages change
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  function handleOnSubmitRoom(event: any) {
    event.preventDefault();
    socket.emit('enterRoom', roomName);
    setRoomName('');
  }

  return (
    <div>
      <h1>Channel</h1>
      <h2>join room</h2>
      <form onSubmit={handleOnSubmitRoom}>
        <input value={roomName} onChange={(event) => setRoomName(event.target.value)}></input>
        <button type="submit">send</button>
      </form>
      <h1> {room} 입니다.</h1>

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
      <form onSubmit={handleOnSubmit}>
        <input value={value} onChange={event => setValue(event.target.value)} />
        <button type="submit">send</button>
      </form>
    </div>
  );
}