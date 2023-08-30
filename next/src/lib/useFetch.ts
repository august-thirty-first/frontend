'use client';

import { HomeSocketContext } from '@/app/(home)/createHomeSocketContext';
import { useShowModal } from '@/app/ShowModalContext';
import { useRouter } from 'next/navigation';
import {
  useEffect,
  useCallback,
  useRef,
  MutableRefObject,
  useState,
  useContext,
} from 'react';

interface fetchResponse<T> {
  isLoading: boolean;
  urlRef: MutableRefObject<string>;
  bodyRef: MutableRefObject<any | undefined>;
  statusCodeRef?: MutableRefObject<number | undefined>;
  dataRef?: MutableRefObject<T | undefined>;
  errorDataRef?: MutableRefObject<any | undefined>;
  errorRef?: MutableRefObject<string | undefined>;
  fetchData: (requestBodyOverride?: any) => Promise<T | undefined>;
}

interface useFetchProps {
  autoFetch: boolean;
  url: string;
  method: string;
  body?: any;
  contentType?: string;
}

export function useFetch<T>({
  autoFetch = true,
  url,
  method,
  body,
  contentType,
}: useFetchProps): fetchResponse<T> {
  const socket = useContext(HomeSocketContext);
  const [isLoading, setIsLoading] = useState<boolean>(autoFetch ? true : false);
  const statusCodeRef = useRef<number>();
  const urlRef = useRef<string>(url);
  const errorDataRef = useRef<any>();
  const errorRef = useRef<string>();
  const bodyRef = useRef<any>(body);
  const dataRef = useRef<T>();
  const backend_url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/`;
  const router = useRouter();
  const alertModal = useShowModal();

  const fetchData = useCallback(async (): Promise<T | undefined> => {
    try {
      setIsLoading(true);
      const options: RequestInit = {
        method,
        credentials: 'include', // to send cookies
      };
      if (bodyRef) options.body = bodyRef.current;
      if (contentType) options.headers = { 'Content-Type': contentType };

      const response: Response = await fetch(
        `${backend_url}${urlRef.current}`,
        options,
      );
      statusCodeRef.current = response.status;
      const responseType: string | null = response.headers.get('content-type');
      const contentLength: string | null =
        response.headers.get('Content-Length');
      if (response.ok) {
        errorDataRef.current = undefined;
        errorRef.current = undefined;
      }
      if ((contentLength === '0' || response.status === 204) && response.ok)
        dataRef.current = undefined;
      else if (responseType?.indexOf('application/json') !== -1) {
        if (response.ok) dataRef.current = await response.json();
        else errorDataRef.current = await response.json();
      }
      if (errorDataRef.current) {
        const errorMsg = errorDataRef.current.message;
        if (response.status === 401 && errorMsg === 'UNAUTHORIZED') {
          if (socket.connected) socket.disconnect();
          alertModal('다시 로그인을 해주세요.');
          router.push('/login');
        } else alertModal(errorMsg);
      }
      return dataRef.current;
    } catch (error: any) {
      error.current = error.message;
      alertModal(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [urlRef, contentType, method, bodyRef, router, socket, alertModal]);

  useEffect(() => {
    if (autoFetch) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
    urlRef,
    statusCodeRef,
    dataRef,
    bodyRef,
    errorDataRef,
    errorRef,
    fetchData,
  };
}
