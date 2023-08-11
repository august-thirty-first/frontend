import childrenProps from '@/interfaces/childrenProps.interface';
import Navigation from '@/components/navigation';
import Friends from '@/components/friends';
import Alarms from '@/components/alarms';
import LadderBtn from './ladderBtn';

export default function CommunicationLayout({ children }: childrenProps) {
  return (
    <div>
      <Navigation />
      {children}
      <LadderBtn />
      <Friends />
      <Alarms />
    </div>
  );
}
