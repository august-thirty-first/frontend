'use client';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import ChatParticipant from '@/interfaces/chatParticipant.interface';
export const MyParticipantInfoContext = createContext<
  [
    ChatParticipant | undefined,
    Dispatch<SetStateAction<ChatParticipant | undefined>>,
  ]
>([undefined, () => {}]);

export default function MyParticipantInfoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const myParticipantInfo = useState<ChatParticipant>();
  return (
    <MyParticipantInfoContext.Provider value={myParticipantInfo}>
      {children}
    </MyParticipantInfoContext.Provider>
  );
}

export function useMyParticipantInfo() {
  const value = useContext(MyParticipantInfoContext);
  if (value === undefined) {
    throw new Error('채팅방이 선택되지 않았습니다.');
  }
  return value;
}
