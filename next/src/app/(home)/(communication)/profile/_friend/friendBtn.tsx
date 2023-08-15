import { mutate } from 'swr';
import FriendActionBtn from './friendActionBtn';
import { searchProfileResponse, searchUserRequestStatus } from '../searchBar';

interface FriendBtnProps {
  profile: searchProfileResponse;
}

const FriendBtn = ({ profile }: FriendBtnProps) => {
  const friend_status = profile.friend_status;

  const refreshBtn = async () => {
    mutate('/friend');
    mutate('/searchBar');
  };

  return (
    <div>
      {friend_status === null && (
        <FriendActionBtn
          title="친구 요청"
          userId={profile.id}
          refreshBtn={refreshBtn}
          url="friend/request"
          method="POST"
          successStatusCode={201}
        />
      )}
      {friend_status === searchUserRequestStatus.RecvRequest && (
        <>
          <FriendActionBtn
            title="친구 수락"
            userId={profile.id}
            refreshBtn={refreshBtn}
            url="friend/approve"
            method="PATCH"
            successStatusCode={204}
          />
          <FriendActionBtn
            title="친구 거절"
            userId={profile.id}
            refreshBtn={refreshBtn}
            url="friend/reject"
            method="PATCH"
            successStatusCode={204}
          />
        </>
      )}
      {friend_status === searchUserRequestStatus.SendRequest && (
        <FriendActionBtn
          title="친구 요청 취소"
          userId={profile.id}
          refreshBtn={refreshBtn}
          url="friend/cancel"
          method="PATCH"
          successStatusCode={204}
        />
      )}
      {friend_status === searchUserRequestStatus.Allow && (
        <FriendActionBtn
          title="친구 삭제"
          userId={profile.id}
          refreshBtn={refreshBtn}
          url="friend/delete"
          method="DELETE"
          successStatusCode={200}
        />
      )}
    </div>
  );
};

export default FriendBtn;
