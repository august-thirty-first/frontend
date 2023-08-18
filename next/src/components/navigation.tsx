import Link from 'next/link';
import Logout from './logout';

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
      <div>
        <h1 className="lg:text-6xl sm:text-4xl text-2xl mt-5">
          핑퐁언틸어거스트서티퍼스트
        </h1>
      </div>
      <nav className="flex justify-around mt-3 lg:mt-5 mb-3">
        <NavLink href="/channel">채팅 채널 보기</NavLink>
        <NavLink href="/profile">프로필 보기</NavLink>
        <Logout />
      </nav>
    </header>
  );
}
