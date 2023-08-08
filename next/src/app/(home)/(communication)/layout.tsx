import childrenProps from '@/interfaces/childrenProps.interface';
import Navigation from '@/components/navigation';
import Friends from '@/components/friends';
import Alarms from '@/components/alarms';
import PlayLadderModal from '@/components/playLadderModal';

export default function CommunicationLayout({ children }: childrenProps) {
  return (
    <div>
      <PlayLadderModal />
      <Navigation />
      {children}
      <Friends />
      <Alarms />
    </div>
  );
}
