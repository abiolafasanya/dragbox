import Providers from '@/components/auth/providers';
import '../global.css';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';

const fonts = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DragBox',
  description:
    'Explore an online image gallery where users can effortlessly upload and share their stunning images, from landscapes to captivating moments. Join us to discover a world of visual storytelling and artistic expression',
  keywords:
    'Online Photo Gallery, Visual Collection, Multimedia Gallery, Picture Repository, Artistic Display, Image Showcase, Photo Album, Creative Exhibit, Photography Portfolio, Digital Art Vault.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={fonts.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
