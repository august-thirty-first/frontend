'use client';

import Modal from '@/components/modal/Modal';
import ModalContent from '@/components/modal/ModalContent';
import ModalHeader from '@/components/modal/ModalHeader';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react';

export interface ShowModalProviderValue {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setMessage: Dispatch<SetStateAction<string>>;
}

const ShowModalContext = createContext<ShowModalProviderValue | null>(null);

const ShowModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  return (
    <ShowModalContext.Provider
      value={{
        showModal: showModal,
        setShowModal: setShowModal,
        setMessage: setMessage,
      }}
    >
      {showModal && (
        <Modal closeModal={setShowModal} zIndex={20}>
          <ModalHeader title="메세지" />
          <ModalContent>{message}</ModalContent>
        </Modal>
      )}
      {children}
    </ShowModalContext.Provider>
  );
};

export const useShowModal = () => {
  const context = useContext<ShowModalProviderValue | null>(ShowModalContext);

  return useCallback(
    (message: string) => {
      if (!context?.showModal) {
        context?.setMessage(message);
        context?.setShowModal(true);
      }
    },
    [context],
  );
};

export default ShowModalProvider;
