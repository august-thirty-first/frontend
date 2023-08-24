'use client';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react';
import ToastBar from '@/components/toast';
export interface ToastProps {
  id: number;
  message: string;
}

interface ToastContextValue {
  addToast(message: string): void;
}

const ToastContext = createContext<ToastContextValue>({ addToast: () => {} });

export function ToastContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = (message: string) => {
    const toast: ToastProps = {
      id: Date.now(),
      message: message,
    };
    setToasts(prevToasts => {
      if (prevToasts.length >= 5) {
        return [...prevToasts];
      }
      return [...prevToasts, toast];
    });
    setTimeout(() => {
      removeToast(toast.id);
    }, 5000); // 3초 후에 토스트 숨김
  };

  const removeToast = (id: number) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast: addToast }}>
      <ToastBar toasts={toasts} onClose={removeToast} />
      {children}
    </ToastContext.Provider>
  );
}

const useToast = () => {
  const context = useContext(ToastContext);

  return useCallback((message: string) => {
    context.addToast(message);
  }, []);
};

export default useToast;
