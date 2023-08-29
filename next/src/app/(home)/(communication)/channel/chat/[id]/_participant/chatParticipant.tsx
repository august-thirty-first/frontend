import ChatParticipant, {
  ChatParticipantWithBlackList,
} from '@/interfaces/chatParticipant.interface';
import Btn from '@/components/btn';
import { useState } from 'react';
import ParticipantDetails from '@/app/(home)/(communication)/channel/chat/[id]/_participant/participantDetails';

export default function ChatParticipantList({
  participants,
  roomId,
}: {
  participants: ChatParticipantWithBlackList[];
  roomId: number;
}) {
  const [showDetails, setShowDetails] =
    useState<ChatParticipantWithBlackList | null>(null);

  return (
    <div>
      <label>참여자 목록</label>
      {participants &&
        participants.map(
          (participant: ChatParticipantWithBlackList, index: number) => (
            <div key={index}>
              <Btn
                title={`${participant.user.nickname}`}
                type={'button'}
                handler={() => {
                  setShowDetails(
                    showDetails === participant ? null : participant,
                  );
                }}
              />
              {showDetails === participant && (
                <ParticipantDetails roomId={roomId} participant={participant} />
              )}
            </div>
          ),
        )}
    </div>
  );
}
