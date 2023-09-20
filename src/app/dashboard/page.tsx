import Header from '@/components/shared/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Content from './components/content';
import db from '@/lib/db';

const Dashboard = async () => {
  const images = await db.upload.findMany()
  return (
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
  );
};
export default Dashboard;