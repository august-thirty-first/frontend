import { useContext, useState } from 'react';
import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';

export default function SendMessage() {
  const socket = useContext(HomeSocketContext);
  const [message, setMessage] = useState('');
  function handleOnSubmit(event: any) {
    event.preventDefault();
    setMessages(prevMessages => [...prevMessages, `You: ${message}`]);
    socket.emit('message', { room, message });
    setMessage('');
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <input value={value} onChange={event => setValue(event.target.value)} />
      <button type="submit">send</button>
    </form>
  );
}
