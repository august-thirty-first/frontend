import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';
import Btn from '@/components/btn';
import useToast from '@/components/toastContext';
import ChatParticipant from '@/interfaces/chatParticipant.interface';
import { useContext, useEffect, useState } from 'react';

export default function BlackList({
  participant,
  roomId,
}: {
  participant: ChatParticipant;
  roomId: number;
}) {
  const targetUserId = participant.user.id;
  const socket = useContext(HomeSocketContext);
  const toast = useToast();
  const [isBlackList, setBlackList] = useState(false);

  useEffect(() => {
    socket.on('setBlackList', msg => {
      toast(msg);
      if (msg === 'set black list success') {
        setBlackList(true);
      }
    });
    socket.on('unSetBlackList', msg => {
      toast(msg);
      if (msg === 'unset black list success') {
        setBlackList(false);
      }
    });
  }, []);

  function setBlackListParticipant() {
    socket.emit(
      'setBlackList',
      JSON.stringify({
        userId: targetUserId,
      }),
    );
  }

  function unSetBlackListParticipant() {
    socket.emit(
      'unSetBlackList',
      JSON.stringify({
        userId: targetUserId,
      }),
    );
  }
  const handler = isBlackList
    ? unSetBlackListParticipant
    : setBlackListParticipant;
  return (
    <Btn title={isBlackList ? '차단해제' : '차단하기'} handler={handler} />
  );
}
