import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HeyGen Streaming Avatar Demo',
  description: 'Interactive Avatar Demo using HeyGen Streaming Avatar SDK',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
