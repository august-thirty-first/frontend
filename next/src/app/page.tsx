import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function Home() {
  const token = cookies().get('access_token');
  if (!token) redirect('/login');
  else redirect('/profile');
}
