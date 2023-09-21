'use client';
import Image from 'next/image';
import Link from 'next/link';

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) => {
  return (
    <div className='flex flex-col items-center justify-center h-screen w-full'>
      <Image
        src={'/error.gif'}
        width={300}
        height={300}
        alt='error'
        className='rounded-full'
      />
      <h1 className='px-5 px:mx-14'>{error?.message || 'Something went wrong'}</h1>
      <div className='flex items-center justify-center gap-4'>
        <button
          className='border-2 border-black px-5 py-3 my-5 rounded-lg outline-none'
          onClick={reset}
        >
          Try again
        </button>
        <Link
          href={'/'}
          className='rounded-lg py-3 px-5  bg-black text-white fibt-semibold'
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
