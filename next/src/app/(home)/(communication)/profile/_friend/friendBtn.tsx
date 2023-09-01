import { mutate } from 'swr';
import FriendActionBtn from './friendActionBtn';
import { searchUserRequestStatus } from '../searchBar';

interface FriendBtnProps {
  id: number;
  status: searchUserRequestStatus | null;
}

const FriendBtn = ({ id, status }: FriendBtnProps) => {
  const refreshBtn = async () => {
    mutate('/friend');
    mutate('/alarms');
    mutate('/searchBar');
  };

  return (
    <div className="flex justify-evenly m-0 p-0">
      {status === null && (
        <FriendActionBtn
          title="친구 요청"
          userId={id}
          refreshBtn={refreshBtn}
          url="friend/request"
          method="POST"
          successStatusCode={201}
        />
      )}
      {status === searchUserRequestStatus.RecvRequest && (
        <>
          <FriendActionBtn
            title="친구 수락"
            userId={id}
            refreshBtn={refreshBtn}
            url="friend/approve"
            method="PATCH"
            successStatusCode={204}
          />
          <FriendActionBtn
            title="친구 거절"
            userId={id}
            refreshBtn={refreshBtn}
            url="friend/reject"
            method="PATCH"
            successStatusCode={204}
          />
        </>
      )}
      {status === searchUserRequestStatus.SendRequest && (
        <FriendActionBtn
          title="친구 요청 취소"
          userId={id}
          refreshBtn={refreshBtn}
          url="friend/cancel"
          method="PATCH"
          successStatusCode={204}
        />
      )}
      {status === searchUserRequestStatus.Allow && (
        <FriendActionBtn
          title="친구 삭제"
          userId={id}
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
