import Btn from '@/components/btn';
import RedirectBtn from '@/components/redirectBtn';

export default function Login() {
  return (
    <div>
      <RedirectBtn
        title="login"
        redirectUrl={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`}
      />
    </div>
  );
}
