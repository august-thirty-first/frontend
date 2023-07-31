import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      <Link href="/ladder">레더큐 참여</Link>
      <Link href="/channel">채팅 채널 보기</Link>
      <Link href="/profile">프로필 보기</Link>
      <Link href="#">로그아웃</Link>
    </nav>
  );
}
