import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import LoginForm from './components/login-form';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/route';

const Login = async () => {
  const session = await getServerSession(options);
  if (session) {
    redirect('/dashboard');
  }
  return (
    <div className='flex w-full items-center justify-center p-5  min-h-screen'>
      <Card className='max-w-sm mx-auto'>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Login in to your dashboard to upload and view gallery
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-2'>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
