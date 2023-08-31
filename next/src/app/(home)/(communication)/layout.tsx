import childrenProps from '@/interfaces/childrenProps.interface';
import Navigation from '@/components/navigation';
import Friends from '@/components/friends';
import Alarms from '@/components/alarms';

export default function CommunicationLayout({ children }: childrenProps) {
  return (
    <>
      <Navigation />
      <div className="flex justify-between">
        {children}
        <div className="flex flex-col">
          <Friends />
          <Alarms />
        </div>
      </div>
    </>
  );
}
