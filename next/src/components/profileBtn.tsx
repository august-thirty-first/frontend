import { useRouter } from 'next/navigation';
import SmallBtn from './smallBtn';

interface profileBtnProps {
  nickname: string;
}

const ProfileBtn = ({ nickname }: profileBtnProps) => {
  const router = useRouter();
  const onClick = () => {
    router.push(`/profile?nickname=${nickname}`);
  };
  return <SmallBtn title="프로필" handler={onClick} color="gray" />;
};

export default ProfileBtn;
