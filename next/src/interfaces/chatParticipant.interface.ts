import ChatRoom from '@/interfaces/chatRoom.interface';
import User from '@/interfaces/user.interface';

export enum ParticipantAuthority {
  BOSS = 'boss',
  ADMIN = 'admin',
  NORMAL = 'normal',
}

export default interface ChatParticipant {
  id: number;
  chat_room: ChatRoom;
  user: User;
  authority: ParticipantAuthority;
  ban: Date;
  authority_time: Date;
}
