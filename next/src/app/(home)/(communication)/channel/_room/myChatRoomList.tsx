import GetRoomList from '@/app/(home)/(communication)/channel/_room/getRoomList';

export default function MyChatRoomList() {
  return (
    <div>
      <h2> 내 채팅방 목록 </h2>
      <GetRoomList url={'chat/participant'} />
    </div>
  );
}
