'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const formSchema = z.object({
  username: z.string().email().nonempty().max(50).trim(),
  password: z.string().nonempty().max(50).trim(),
});

type FormSchemaType = z.infer<typeof formSchema>;

const defaultValues: FormSchemaType = {
  username: '',
  password: '',
};

const useLogin = () => {
  const pathName = usePathname();
  const router = useRouter();
  const [error, setError] = useState('');
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function onSubmit(values: FormSchemaType) {
    setError('');
    // console.log(values);
    const { password, username } = values;
    const req = await signIn('credentials', {
      username,
      password,
      redirect: false,
      callbackUrl: `/dashboard?callbackUrl=${pathName}`,
    });

    if (req?.error) {
      setError(req.error);
      form.reset();
      return;
    } 
    if (req?.ok) {
        // console.log(req)
      router.push('/dashboard');
    }
  }

  return { error, form, onSubmit };
};

export default useLogin;
