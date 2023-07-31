import Btn from '@/components/btn';
import RedirectBtn from '@/components/redirectBtn';

export default function Login() {
  return (
    <div>
      <RedirectBtn
        title="login"
        redirectUrl="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-fc98ac0844ad77b1a1932b5d97bfd44e98a5a42ed7f89f4140e6c7c6571f2aca&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Foauth&response_type=code"
      />
    </div>
  );
}
