import childrenProps from '@/interfaces/childrenProps.interface';
import Navigation from '@/components/navigation';
import Friends from '@/components/friends';
import Alarms from '@/components/alarms';

export default function HomeLayout({ children }: childrenProps) {
  return (
    <div>
      <Navigation />
      {children}
      <Friends />
      <Alarms />
    </div>
  );
}
