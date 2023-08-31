'use client';

import Btn from '@/components/btn';
import Modal from '@/components/modal/Modal';
import ModalContent from '@/components/modal/ModalContent';
import ModalHeader from '@/components/modal/ModalHeader';
import { createContext, useContext, useState } from 'react';
import { GameSocketContext } from './createGameSocketContext';
import { useRouter } from 'next/navigation';

export interface ModalContextProps {
  openModal: (message: string) => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  const socket = useContext(GameSocketContext);
  const router = useRouter();

  const openModal = (msg: any) => {
    setMessage(msg);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setMessage('');
    if (socket.connected) socket.disconnect();
    router.push('/profile');
  };

  return (
    <ModalContext.Provider value={{ openModal }}>
      {children}
      {showModal && (
        <Modal closeModal={closeModal}>
          <ModalHeader title="이제 그만" />
          <ModalContent>
            <p>{message}</p>
            <div className="mt-10">
              <Btn type="button" title="홈으로" handler={closeModal} />
            </div>
          </ModalContent>
        </Modal>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export default ModalProvider;
