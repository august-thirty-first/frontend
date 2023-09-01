'use client';
import { useRef, useContext, useEffect, useState } from 'react';
import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';
import { useFetch } from '@/lib/useFetch';
import { searchProfileResponse } from '@/app/(home)/(communication)/profile/searchBar';
import ChatSubmitForm from '@/components/chatSubmitForm';

export default function Channel() {
  const socket = useContext(HomeSocketContext);
  const [room, setRoom] = useState('');
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const { fetchData, dataRef, urlRef } = useFetch<searchProfileResponse>({
    autoFetch: false,
    url: `profile/user?nickname=$nickname`,
    method: 'GET',
  });

  useEffect(() => {
    socket.on('roomChange', room => {
      setRoom(room);
    });
    return () => {
      socket.off('roomChange');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const messageListener = (msg: string) => {
      setMessages(prevMessage => [...prevMessage, msg]);
      console.log(`'message' : ${msg}`);
    };
    socket.on('directMessage', messageListener);
    return () => {
      socket.off('directMessage', messageListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  async function sendDirectMessage(nickname: string, inputMessage: string) {
    urlRef.current = `profile/user?nickname=${nickname}`;
    await fetchData();
    if (dataRef?.current) {
      const directMsg = {
        targetUserId: dataRef.current.id,
        inputMessage: inputMessage,
      };
      socket.emit('directMessage', JSON.stringify(directMsg));
      setMessages(prevMessages => [
        ...prevMessages,
        `${nickname}에게: ${inputMessage}`,
      ]);
    } else {
      setMessages(prevMessages => [
        ...prevMessages,
        `찾을 수 없는 사용자입니다.`,
      ]);
    }
  }

  function handleOnSubmit(event: any) {
    event.preventDefault();

    if (inputMessage.startsWith('/')) {
      const dmRegex = /^\/w\s+(\S+)\s+(.*)$/;
      const regexMatch = inputMessage.match(dmRegex);
      if (regexMatch) sendDirectMessage(regexMatch[1], regexMatch[2]);
      else
        setMessages(prevMessages => [
          ...prevMessages,
          `귓속말 사용법 : /w {user_id} {message}`,
        ]);
    } else {
      setMessages(prevMessages => [...prevMessages, `You: ${inputMessage}`]);
    }
    setInputMessage('');
  }

  function handleOnChange(event: any) {
    setInputMessage(event.target.value);
  }

  return (
    <div className="border border-gray-300 rounded p-2">
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
      <ChatSubmitForm
        title="전송"
        handleOnSubmit={handleOnSubmit}
        value={inputMessage}
        handleOnChange={handleOnChange}
      />
    </div>
  );
}
