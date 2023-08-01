import Btn from '@/components/btn';
import RedirectBtn from '@/components/redirectBtn';

export default function Login() {
  return (
    <div>
      <RedirectBtn
        title="login"
        redirectUrl="http://localhost:3000/api/auth/login"
      />
    </div>
  );
}
