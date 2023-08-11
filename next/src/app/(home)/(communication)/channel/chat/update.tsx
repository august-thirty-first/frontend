import { useSearchParams } from 'next/navigation';
import Btn from '@/components/btn';
import { useFetch } from '@/lib/useFetch';
import { useState } from 'react';
import Modal from '@/components/modal/Modal';

export default function RoomUpdate() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get('roomId');
  const [showModal, setShowModal] = useState(false);
  const { isLoading, statusCodeRef, fetchData } = useFetch<void>({
    autoFetch: false,
    method: 'patch',
    url: `chat/${roomId}`,
  });

  function toggleModal(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setShowModal(!showModal);
  }
  async function updateRoomCondition(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(formData);
    await fetchData();

    if (isLoading) return <Btn title={'방 수정중...'} />;

    // Todo: 기존에 방에 참여하고 있었던 사용자에 대한 처리 필요
    if (statusCodeRef?.current === 200) {
      alert('방 수정 완료');
    } else {
      alert('방 삭제 실패');
    }
  }

  return (
    <div>
      <Btn title={'방 수정'} type={'submit'} handler={toggleModal} />
      {showModal && (
        <form onSubmit={updateRoomCondition}>
          <input name={'room_name'} placeholder={'방 이름 입력'} />
          <input name={'password'} placeholder={'방 비밀번호 입력'} />
          <input
            name={'room_name'}
            placeholder={'변경할 상태 (public, private, protected'}
          />
          <Btn title={'전송'} type={'submit'} />
        </form>
      )}
    </div>
  );
}
