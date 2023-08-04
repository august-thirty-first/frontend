import childrenProps from '@/interfaces/childrenProps.interface';
import HomeSocketProvider from './createHomeSocketContext';

export default function HomeLayout({ children }: childrenProps) {
  return (
    <div>
      <HomeSocketProvider>{children}</HomeSocketProvider>
    </div>
  );
}
