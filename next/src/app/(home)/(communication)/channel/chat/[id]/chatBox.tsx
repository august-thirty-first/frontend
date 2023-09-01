'use client';
import SubmitForm from '@/components/submitForm';
import { useContext, useEffect, useRef, useState } from 'react';
import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';
import { useFetch } from '@/lib/useFetch';
import { searchProfileResponse } from '../../../profile/searchBar';
import ChatRoom from '@/interfaces/chatRoom.interface';

export default function ChatBox({ roomId }: { roomId: number }) {
  const socket = useContext(HomeSocketContext);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const { fetchData, dataRef, urlRef } = useFetch<searchProfileResponse>({
    autoFetch: false,
    url: `profile/user?nickname=$nickname`,
    method: 'GET',
  });

  const roomNameData = useFetch<ChatRoom>({
    autoFetch: true,
    url: `chat/name/${roomId}`,
    method: 'GET',
  });

  useEffect(() => {
    setMessages([]);
  }, [roomId]);

  useEffect(() => {
    const messageListener = (msg: string) => {
      setMessages(prevMessage => [...prevMessage, msg]);
      console.log(`'message' : ${msg}`);
    };
    socket.on('message', messageListener);
    socket.on('directMessage', messageListener);
    return () => {
      socket.off('message');
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
      socket.emit(
        'message',
        JSON.stringify({ roomId: roomId, inputMessage: inputMessage }),
      );
    }
    setInputMessage('');
  }

  function handleOnChange(event: any) {
    setInputMessage(event.target.value);
  }
  return (
    <div>
      <h1>
        {roomNameData.dataRef?.current?.room_name || '채팅방 이름 정보 없음'}
      </h1>
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
