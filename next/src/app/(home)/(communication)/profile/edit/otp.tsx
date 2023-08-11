import Btn from '@/components/btn';
import Modal from '@/components/modal/Modal';
import { useFetch } from '@/lib/useFetch';
import { useState } from 'react';
import OtpModal from './otpModal';

interface myInfoResponse {
  nickname: string;
  avata_path: string;
  has_otp_key: boolean;
}

const Otp = () => {
  const profileRes = useFetch<myInfoResponse>({
    autoFetch: true,
    url: 'profile/me',
    method: 'GET',
  });
  const deleteOtpRes = useFetch<void>({
    autoFetch: false,
    url: 'profile/otp',
    method: 'DELETE',
  });
  const [showModal, setShowModal] = useState<boolean>(false);

  const removeOtpHandler = async () => {
    if (confirm('OTP 설정을 해제하시겠습니까?')) {
      await deleteOtpRes.fetchData();
      if (deleteOtpRes.statusCodeRef?.current === 204) profileRes.fetchData();
    }
  };

  const modalCloseFunction = () => {
    setShowModal(false);
    profileRes.fetchData();
  };

  if (profileRes.isLoading) return <p>loading...</p>;
  if (profileRes.errorRef?.current || profileRes.errorDataRef?.current)
    return <p>error....</p>;

  return (
    <>
      <Btn
        title={
          profileRes.dataRef?.current?.has_otp_key ? 'OTP 해제' : 'OTP 설정'
        }
        handler={e => {
          e.preventDefault();
          if (profileRes.dataRef?.current?.has_otp_key) removeOtpHandler();
          else setShowModal(!showModal);
        }}
      />
      {showModal && (
        <Modal closeModal={setShowModal}>
          <OtpModal closeModal={modalCloseFunction} />
        </Modal>
      )}
    </>
  );
};
export default Otp;
