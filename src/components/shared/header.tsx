'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '../ui/button';
import { Fragment } from 'react';
import Link from 'next/link';

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className='w-full'>
      <menu className='w-full gap-5 flex justify-between'>
        <h2 className='text-2xl text-center font-semibold my-4'>
          Drag<span className='text-stone-500'>Box</span>
        </h2>
        <div className='flex gap-2 items-center'>
          {session && session.user ? (
            <Fragment>
              <span className='sm:hidden md:inline-flex'>{session.user.email}</span>
              <Button variant={'default'} onClick={() => signOut()}>
                Logout
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <Button variant={'default'} onClick={() => signIn()}>
                Login
              </Button>
            </Fragment>
          )}
        </div>
      </menu>
    </header>
  );
};

export default Header;
