import Header from '@/components/shared/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Content from './components/content';
import db from '@/lib/db';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { Fragment } from 'react';

const Dashboard = async () => {
  const session = await getServerSession(options);
  if (!session) {
    redirect('/auth');
  }
  const images = await db.upload.findMany();
  return (
    <Fragment>
      {session ? (
        <main className='bg-indigo-50 w-full min-h-screen'>
          <div className='flex flex-col py-10 px-5 lg:px-20'>
            <Header />
            <Card className='w-full mx-auto mt-5'>
              <CardHeader>
                <CardTitle>Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <Content images={images} />
              </CardContent>
            </Card>
          </div>
        </main>
      ) : null}
    </Fragment>
  );
};
export default Dashboard;
