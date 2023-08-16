'use client';
import { useContext, useEffect, useState } from 'react';
import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';
import ChatBox from '@/app/(home)/(communication)/channel/chat/chatBox';
import RoomDelete from '@/app/(home)/(communication)/channel/chat/delete';
import RoomBuilder from '@/app/(home)/(communication)/channel/_room/roomBuilder';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFetch } from '@/lib/useFetch';
import ChatParticipant from '@/interfaces/chatParticipant.interface';
import Modal from '@/components/modal/Modal';
import Btn from '@/components/btn';

export default function Chat() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get('roomId');
  const requirePassword = searchParams.get('requirePassword');
  const socket = useContext(HomeSocketContext);
  const router = useRouter();
  const { isLoading, statusCodeRef, dataRef, bodyRef, fetchData } =
    useFetch<ChatParticipant>({
      autoFetch: false,
      method: 'POST',
      contentType: 'application/json',
      url: 'chat/participant',
    });
  const [showChat, setShowChat] = useState(false);

  /*
    채팅 페이지에 올 때 무조건 서버로 요청을 보내서 검사를 해야한다
    패스워드를 입력해야 하는 방이라면 입력 후 요청을 보내게 한다
    선택한 메시지를 context로 하여 전달하도록 하자
   */
  async function joinRoom() {
    bodyRef.current = JSON.stringify({
      chat_room_id: roomId,
      password: '',
    });
    await fetchData();
    // if (!(statusCodeRef?.current == 200 || statusCodeRef?.current === 201)) {
    //   router.push('/channel');
    // }
    setShowChat(true);
  }

  useEffect(() => {
    joinRoom();
  }, []);

  return (
    <div>
      {showChat && (
        <div>
          <ChatBox />
          {/*Todo: 유저의 권한에 대해 확인하고 RoomDelete, RoomUpdate 두 컴포넌트를 보이게 하는 코드 필요*/}
          <RoomDelete />
          <RoomBuilder
            title={'방 수정'}
            method={'PATCH'}
            url={`chat/${roomId}`}
          />
        </div>
      )}
    </div>
  );
}
// {showModal && (
//     <Modal closeModal={toggleModal}>
//       <form
//           onSubmit={event => {
//             const password = new FormData(event.currentTarget).get(
//                 'password',
//             );
//             joinRoom(selectedRoom, password);
//           }}
//       >
//         <label htmlFor="password">비밀번호 입력</label>
//         <input name={'password'} />
//         <Btn title={'입장'} type={'submit'} />
//       </form>
//     </Modal>
// )}
