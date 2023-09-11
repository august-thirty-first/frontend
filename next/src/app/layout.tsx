import '@/style/globals.css';

import { Metadata } from 'next';
import ShowModalProvider from './ShowModalContext';
import { ToastContextProvider } from '@/components/toastContext';

export const metadata: Metadata = {
  title: 'home',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/mvp.css"></link>
      </head>
      <body className="m-0 p-0">
        <ToastContextProvider>
          <ShowModalProvider>{children}</ShowModalProvider>
        </ToastContextProvider>
      </body>
    </html>
  );
}
