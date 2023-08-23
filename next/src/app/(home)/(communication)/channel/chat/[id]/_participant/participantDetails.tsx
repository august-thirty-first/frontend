import ChatParticipant, {
  ParticipantAuthority,
} from '@/interfaces/chatParticipant.interface';
import Ban from '@/app/(home)/(communication)/channel/chat/[id]/_participant/ban';
import Kick from '@/app/(home)/(communication)/channel/chat/[id]/_participant/kick';
import Mute from '@/app/(home)/(communication)/channel/chat/[id]/_participant/mute';
import SwitchAuthroity from '@/app/(home)/(communication)/channel/chat/[id]/_participant/authroity';
import { useMyParticipantInfo } from '@/app/(home)/(communication)/channel/MyParticipantInfoContext';

export default function ParticipantDetails({
  participant,
}: {
  participant: ChatParticipant;
}) {
  const [myParticipantInfo] = useMyParticipantInfo();

  return (
    <>
      {(myParticipantInfo?.authority === ParticipantAuthority.BOSS ||
        myParticipantInfo?.authority === ParticipantAuthority.ADMIN) && (
        <>
          <Ban participant={participant} />
          <Kick participant={participant} />
          <Mute participant={participant} />
          <SwitchAuthroity participant={participant} />
        </>
      )}
    </>
  );
}
