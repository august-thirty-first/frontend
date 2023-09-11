import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';
import Btn from '@/components/btn';
import SmallBtn from '@/components/smallBtn';
import useToast from '@/components/toastContext';
import ChatParticipant, {
  ChatParticipantWithBlackList,
} from '@/interfaces/chatParticipant.interface';
import { useContext, useEffect, useState } from 'react';

export default function BlackList({
  participant,
  roomId,
}: {
  participant: ChatParticipantWithBlackList;
  roomId: number;
}) {
  const targetUserId = participant.user.id;
  const socket = useContext(HomeSocketContext);
  const toast = useToast();
  const isBlackList = participant.blackList;

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
    <SmallBtn title={isBlackList ? '차단해제' : '차단하기'} handler={handler} />
  );
}
