'use client';
import Image from 'next/image';
// import { useSession, signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import Header from '@/components/shared/header';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const handleRedirect = () => {
    router.push('/dashboard');
  };

  return (
    <div className=' bg-indigo-50'>
      <main className='flex min-h-screen flex-col items-center max-w-[1280px] m-auto justify-center  py-7 sm:mb-10 md:mb-0 px-5 lg:px-20'>
        <Header />
        <div className='flex flex-col md:flex-row md:py-10 gap-5 justify-between items-center'>
          <div className='flex flex-col lg:w-[60%]items-center'>
            <Image
              src='/welcome.gif'
              width={350}
              height={350}
              alt=''
              className='h-auto w-80 bg-transparent rounded-full'
            />
            <h2 className='text-2xl text-center font-semibold my-4'>
              Drag<span className='text-stone-500'>Box</span>
            </h2>
          </div>
          <div className='flex flex-col gap-5 lg:w-[40%]'>
            <p className='text-justify'>
              Explore an online image gallery where users can effortlessly
              upload and share their stunning images, from landscapes to
              captivating moments. Join us to discover a world of visual
              storytelling and artistic expression
            </p>
            <Button variant={'default'} onClick={() => handleRedirect()}>
              Get Started
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
