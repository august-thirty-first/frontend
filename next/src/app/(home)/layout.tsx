import childrenProps from '@/interfaces/childrenProps.interface';
import HomeSocketProvider from './createHomeSocketContext';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


export default function HomeLayout({ children }: childrenProps) {
  const token = cookies().get('access_token');
  if (!token) redirect('/login');

  return (
    <div>
      <HomeSocketProvider>{children}</HomeSocketProvider>
    </div>
  );
}
