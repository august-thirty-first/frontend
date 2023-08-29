import ChatParticipant, {
  ChatParticipantWithBlackList,
  ParticipantAuthority,
} from '@/interfaces/chatParticipant.interface';
import Ban from '@/app/(home)/(communication)/channel/chat/[id]/_participant/ban';
import Kick from '@/app/(home)/(communication)/channel/chat/[id]/_participant/kick';
import Mute from '@/app/(home)/(communication)/channel/chat/[id]/_participant/mute';
import SwitchAuthority from '@/app/(home)/(communication)/channel/chat/[id]/_participant/authority';
import { useMyParticipantInfo } from '@/app/(home)/(communication)/channel/MyParticipantInfoContext';
import BlackList from './blackList';

export default function ParticipantDetails({
  participant,
  roomId,
}: {
  participant: ChatParticipantWithBlackList;
  roomId: number;
}) {
  const [myParticipantInfo] = useMyParticipantInfo();

  return (
    <>
      {(myParticipantInfo?.authority === ParticipantAuthority.BOSS ||
        myParticipantInfo?.authority === ParticipantAuthority.ADMIN) && (
        <>
          <Ban roomId={roomId} participant={participant} />
          <Kick roomId={roomId} participant={participant} />
          <Mute roomId={roomId} participant={participant} />
          <SwitchAuthority roomId={roomId} participant={participant} />
        </>
      )}
      <BlackList roomId={roomId} participant={participant} />
    </>
  );
}
