import {
  useCallback,
  useRef,
  MouseEventHandler,
  Dispatch,
  SetStateAction,
} from 'react';

interface ModalProps {
  children: React.ReactNode;
  closeModal: Dispatch<SetStateAction<boolean>>;
  zIndex?: number;
}

export default function Modal({
  children,
  closeModal,
  zIndex = 10,
}: ModalProps) {
  const overlay = useRef(null);
  const wrapper = useRef(null);

  const onDismiss = useCallback(() => {
    closeModal(false);
  }, [closeModal]);

  const onClick: MouseEventHandler = useCallback(
    e => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper],
  );

  return (
    <div
      ref={overlay}
      className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60"
      style={{ zIndex: zIndex }}
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-10/12 md:w-8/12 lg:w-1/2 p-6"
      >
        <div className="border border-teal-500 shadow-lg modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
          <div className="py-4 px-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
