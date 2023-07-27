import Btn from '@/components/btn';
import RedirectBtn from '@/components/redirectBtn';

export default function Login() {
  return (
    <div>
      <RedirectBtn
        title="login"
        redirectUrl="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-52be662397c7f20026ae0e062613ea217702c8e48b3f88c66c98b03efeb0488b&redirect_uri=http%3A%2F%2F10.19.233.2%3A3000%2Fapi%2Fauth%2Foauth&response_type=code"
      />
    </div>
  );
}
