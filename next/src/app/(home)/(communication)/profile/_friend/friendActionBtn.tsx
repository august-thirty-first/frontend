import { useShowModal } from '@/app/ShowModalContext';
import SmallBtn from '@/components/smallBtn';
import { useFetch } from '@/lib/useFetch';
import { useEffect } from 'react';

interface FriendActionBtnProps {
  userId: number;
  url: string;
  method: string;
  refreshBtn: () => Promise<void>;
  successStatusCode: number;
  title: string;
}

const FriendActionBtn = ({
  userId,
  url,
  method,
  refreshBtn,
  successStatusCode,
  title,
}: FriendActionBtnProps) => {
  const { isLoading, statusCodeRef, fetchData, bodyRef } = useFetch<void>({
    autoFetch: false,
    url: url,
    method: method,
    body: JSON.stringify({ userId }),
    contentType: 'application/json',
  });
  const alertModal = useShowModal();

  useEffect(() => {
    bodyRef.current = JSON.stringify({ userId });
  }, [userId, bodyRef]);

  const onClick = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    await fetchData();
    if (statusCodeRef?.current === successStatusCode) alertModal('요청 성공');
    refreshBtn();
  };

  return <SmallBtn title={title} handler={onClick} disabled={isLoading} />;
};

export default FriendActionBtn;
