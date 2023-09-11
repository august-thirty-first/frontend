'use client';
import React, { useState } from 'react';
import './Toast.css';
import { ToastProps } from '@/components/toastContext';

export default function ToastBar({
  toasts,
  onClose,
}: {
  toasts: ToastProps[];
  onClose({}): void;
}) {
  return (
    <div className={'toast-container'}>
      {toasts &&
        toasts.map((toast: ToastProps, index: number) => (
          <div key={index} className={'toast'}>
            <span>{toast.message}</span>
            {toast.successHandler && (
              <button onClick={toast.successHandler}>수락</button>
            )}
            <button onClick={() => onClose(toast.id)}>X</button>
          </div>
        ))}
    </div>
  );
}
