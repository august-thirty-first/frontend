import Image from 'next/image';
import defaultImg from '@/public/login540.png';
import Link from 'next/link';

export default function Login() {
  const logoStyle = {
    display: 'block',
    margin: 'auto',
  };
  return (
    <div className="flex justify-center ">
      <Link href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`}>
        <Image src={defaultImg} alt="Logo" style={logoStyle} className="m-0" />
      </Link>
    </div>
  );
}
