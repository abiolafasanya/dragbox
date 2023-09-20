'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import useLogin from '../hooks/useLogin';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Fragment, useState } from 'react';
import AlertMessage from '@/app/dashboard/components/alert-message';
import { Eye, EyeOff } from 'lucide-react';

const LoginForm = () => {
  const { form, onSubmit, error } = useLogin();
  const isLoading = form.formState.isSubmitting;
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((show) => !show);
  return (
    <Fragment>
      {error ? <AlertMessage error message={error} /> : null}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder='username'
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='password'
                      {...field}
                      disabled={isLoading}
                    />
                    <div className='absolute right-2 top-2.5'>
                      {showPassword ? (
                        <EyeOff size={20} onClick={toggleShowPassword} />
                      ) : (
                        <Eye size={20} onClick={toggleShowPassword} />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading}>Submit</Button>
        </form>
      </Form>
    </Fragment>
  );
};

export default LoginForm;
