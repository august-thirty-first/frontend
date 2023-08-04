import childrenProps from '@/interfaces/childrenProps.interface';
import Navigation from '@/components/navigation';
import Friends from '@/components/friends';
import Alarms from '@/components/alarms';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function HomeLayout({ children }: childrenProps) {
  const token = cookies().get('access_token');
  if (!token) redirect('/login');

  return (
    <div>
      <Navigation />
      {children}
      <Friends />
      <Alarms />
    </div>
  );
}
