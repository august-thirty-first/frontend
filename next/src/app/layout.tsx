import '@/style/globals.css';
import RedirectBtn from '@/components/redirectBtn';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <RedirectBtn
          title="logout"
          redirectUrl="http://localhost:3000/api/auth/logout"
        />
      </body>
    </html>
  );
}
