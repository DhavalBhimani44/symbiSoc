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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { signInSchema } from '@/app/validationSchema';
import { Sign } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { useToast } from '../ui/use-toast';
import React, { useState, useEffect } from 'react';

type SignInForm = z.infer<typeof signInSchema>

const SignInForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      userType: 'STUDENT',
    },
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    try {
      const response = await axios.post('api/user/sign-in', values);

      const { userType } = response.data.user;

      const redirectUrl = getDashboardRedirectUrl(userType);
      router.push(redirectUrl);
      toast({
        duration: 2000,
        description: 'User signed in successfully'
      })
    } catch (error: any) {
      toast({
        duration: 2000,
        description: 'User sign in failed',
      })
      console.log("Following error occured: ", error);
    }
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
    <div className={`w-fit lg:w-1/4 xl:w-1/4 m-auto px-4 sm:px-2 md:px-4 lg:px-4 xl:px-4 py-2 flex flex-col justify-center items-center shadow-lg z-1 bg-neutral-800 rounded-lg`}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col justify-center items-center py-1'>
          <div className='w-full h-3/4 flex flex-col space-y-6 justify-center items-center'>
            <div className='flex w-full sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4 justify-center items-center'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel><div className='lg:text-xl sm:text-lg text-slate-200'>Email</div></FormLabel>
                    <FormControl>
                      <Input className='w-48 sm:w-56 md:w-56 lg:w-56 xl:w-64 shadow-lg bg-slate-200 text-black' placeholder='mail@sitpune.edu.in' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex w-full sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4 justify-center items-center'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel><div className='lg:text-xl sm:text-lg text-slate-200'>Password</div></FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        className='w-48 sm:w-56 md:w-56 lg:w-56 xl:w-64 shadow-lg bg-slate-200 z-100 text-black'
                        placeholder='Enter your password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex w-full justify-center items-center'>
              <FormField
                control={form.control}
                name='userType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel><div className='lg:text-xl sm:text-lg text-slate-200'>User Type</div></FormLabel>
                    <FormControl>
                      <Select {...field} onValueChange={(selectedValue) => form.setValue('userType', selectedValue)}>
                        <SelectTrigger className="w-48 sm:w-56 md:w-56 lg:w-56 xl:w-64 shadow-lg bg-slate-200">
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
            <Button className='w-max text-md shadow-indigo-500/50 hover:shadow-indigo-500/50 shadow-md hover:shadow-lg bg-gradient-to-br from-fuchsia-500 to-cyan-500 hover:bg-gradient-to-tl hover:from-fuchsia-500 hover:to-cyan-500 transition duration-300 ease-in-out' type='submit'>
              Sign in
            </Button>            
          </div>
        </form>
        <div className='mx-auto my-4 flex w-3/4 text-gray-200 items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
          or
        </div>
        <div className='flex justify-center items-center text-gray-200 my-2 text-sm'>
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
