import RoomList from '@/app/(home)/(communication)/channel/_room/roomList';

export default function MyRoomList() {
  return (
    <div>
      <h2> 내 채팅방 목록 </h2>
      <RoomList
        listAPI={'chat/participant'}
        joinAPI={'chat/participant/permission'}
      />
    </div>
  );
}
