export enum RoomStatus {
  public = 'public',
  protected = 'protected',
  private = 'private',
}

export default interface ChatRoom {
  id: number;
  room_name: string;
  status: RoomStatus;
  password: string;
  created_at: Date;
  updated_at: Date;
}
