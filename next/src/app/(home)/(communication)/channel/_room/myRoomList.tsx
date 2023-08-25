import RoomList from '@/app/(home)/(communication)/channel/_room/roomList';

export default function MyRoomList() {
  return (
    <div>
      <h2> 내 채팅방 목록 </h2>
      <RoomList listAPI={'chat/participation'} joinAPI={'chat/enter'} />
    </div>
  );
}
