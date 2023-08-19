import ModalContent from '@/components/modal/ModalContent';
import ModalHeader from '@/components/modal/ModalHeader';
import { useState } from 'react';
import Image from 'next/image';
import Btn from '@/components/btn';
import { useFetch } from '@/lib/useFetch';

interface otpGetResponse {
  qrImage: string;
  secret: string;
}

interface otpModalProps {
  closeModal: () => void;
}

const OtpModal = ({ closeModal }: otpModalProps) => {
  const [token, setToken] = useState<string>('');
  const otpSetupAPI = useFetch<void>({
    autoFetch: false,
    url: 'profile/otp',
    method: 'PATCH',
    body: JSON.stringify({ token, secret: '' }),
    contentType: 'application/json',
  });
  const otpGetAPI = useFetch<otpGetResponse>({
    autoFetch: true,
    url: 'profile/otp',
    method: 'GET',
  });

  const validate = (): boolean => {
    const trim_token = token.trim();
    setToken(trim_token);
    if (trim_token.length === 0) {
      alert('token을 입력해주세요.');
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    if (!validate()) return;
    otpSetupAPI.bodyRef.current = JSON.stringify({
      token,
      secret: otpGetAPI.dataRef?.current?.secret,
    });
    await otpSetupAPI.fetchData();
    if (otpSetupAPI.statusCodeRef?.current === 204) {
      alert('OTP 설정 완료');
      closeModal();
    }
  };

  if (otpGetAPI.isLoading) return <p>Loading...</p>;
  if (otpGetAPI.errorRef?.current || otpGetAPI.errorDataRef?.current)
    return <p>error...</p>;

  return (
    <>
      {otpGetAPI.dataRef?.current && (
        <>
          <ModalHeader title="OTP 설정" />
          <ModalContent>
            <div>
              <div>
                <p>OTP 어플리케이션을 열어서 QR코드를 스캔하세요.</p>
              </div>
              <Image
                src={otpGetAPI.dataRef.current.qrImage}
                width="200"
                height="200"
                alt="OtpSetupImage"
              />
              <div>
                <p>
                  애플리케이션에서 제공하는 일회성 코드를 입력하고 제출을
                  클릭하여 설정을 완료하세요.
                </p>
              </div>
              <input
                onKeyDownCapture={e => {
                  if (e.key === 'Enter') onSubmit();
                }}
                type="text"
                name="token"
                value={token}
                onChange={e => setToken(e.target.value)}
                autoFocus={true}
              />
              <Btn title="제출" handler={onSubmit} />
            </div>
          </ModalContent>
        </>
      )}
    </>
  );
};

export default OtpModal;
