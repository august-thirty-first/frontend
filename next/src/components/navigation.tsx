import Link from 'next/link';
import Logout from './logout';
import Image from 'next/image';
import defaultImg from '@/public/logo.png';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => {
  return (
    <Link className="lg:text-xl sm:text-base text-xs no-underline" href={href}>
      {children}
    </Link>
  );
};

export default function Navigation() {
  return (
    <header>
      <Image src={defaultImg} alt="Logo" width={100} height={100} />
      <nav className="flex justify-around mt-3 lg:mt-5 mb-3">
        <NavLink href="/channel">채팅 채널 보기</NavLink>
        <NavLink href="/profile">프로필 보기</NavLink>
        <Logout />
      </nav>
    </header>
  );
}
