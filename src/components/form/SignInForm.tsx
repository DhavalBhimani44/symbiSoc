'use client';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from '../ui/select';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { signInSchema } from '@/app/validationSchema';
import { Sign } from 'crypto';
import { NextRequest,NextResponse } from 'next/server';

type SignInForm = z.infer<typeof signInSchema>

const SignInForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      userType: 'STUDENT',
    },
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    try {
      const response = await axios.post('api/user/sign-in', values);
      
      const { userId,userType } = response.data.user;
      console.log("user id: ", userId);
      console.log("user type: ", userType);

      const redirectUrl = getDashboardRedirectUrl(userType);

      router.push(redirectUrl);
    } catch (error: any) {
      console.log("Following error occured: ", error);
    }
    console.log(values);
  };

  function getDashboardRedirectUrl(userType: string): string {
    
    switch (userType) {
      case "STUDENT":
        return `/student`;
      case "FACULTY":
        return `/faculty`;
      case "CLUBINCHARGE":
        return `/incharge`;
      case "ADMIN":
        return `/admin`;
      default:
        return "/";
    }
    
  };

  return (
    <div className='lg:w-1/4 md:w-fit sm:w-full m-auto px-4 py-2 flex flex-col justify-center items-center shadow-2xl bg-gradient-to-l from-red-300 to-red-200'>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col justify-center items-center p-1'>
        <div className='w-full h-3/4 flex flex-col space-y-6 justify-center items-center'>
          <div className='flex w-3/4 justify-center items-center'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel><div className='lg:text-xl sm:text-lg'>Email</div></FormLabel>
                  <FormControl>
                    <Input className='w-64 shadow-lg' placeholder='mail@example.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex w-3/4 justify-center items-center'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel><div className='lg:text-xl sm:text-lg'>Password</div></FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      className='w-64 shadow-lg'
                      placeholder='Enter your password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex w-3/4 justify-center items-center'>
            <FormField 
              control={form.control}
              name='userType'
              render={({ field }) => (
              <FormItem>
                <FormLabel><div className='lg:text-xl sm:text-lg'>User Type</div></FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={(selectedValue) => form.setValue('userType', selectedValue)}>
                      <SelectTrigger className="w-64 shadow-lg">
                        <SelectValue placeholder="User type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="STUDENT">Student</SelectItem>
                        <SelectItem value="FACULTY">Faculty</SelectItem>
                        <SelectItem value="CLUBINCHARGE">Club Incharge</SelectItem>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
          <div className='flex flex-col w-full justify-center items-center mt-6'>
            <Button className='w-max text-md shadow-inner' type='submit'>
              Sign in
            </Button>
          </div>
      </form>
      <div className='mx-auto my-4 flex w-3/4 items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        or
      </div>
      <div className='flex justify-center items-center text-gray-600 my-2 text-sm'>
        <div>
          If you don&apos;t have an account, please&nbsp;
          <Link className='text-blue-500 hover:underline' href='/sign-up'>
            Sign up
          </Link>
        </div>
      </div>
    </Form>
    </div>
  );
};

export default SignInForm;
