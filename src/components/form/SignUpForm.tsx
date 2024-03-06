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
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import axios from "axios";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FormSchema } from '@/app/validationSchema';

type FormSchema = z.infer<typeof FormSchema>

const SignUpForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      await axios.post('api/user/sign-up', values);
      toast.success("user created successfully");
      router.push('/');
    } catch (error: any) {
      toast.error("user not created");
      console.log("Following error occured: ", error);
    }
    
    console.log(values);
  };

  return (
    <div className='lg:w-1/4 md:w-fit sm:w-full m-auto px-4 py-2 flex flex-col justify-center items-center shadow-2xl bg-gradient-to-l from-red-300 to-red-200'>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col justify-center items-center'>
        <div className='flex flex-col w-full h-3/4 space-y-6 justify-center items-center'>
          <div className='flex w-3/4 justify-center items-center'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel><div className='lg:text-xl sm:text-lg'>Username</div></FormLabel>
                <FormControl>
                  <Input className='w-64 shadow-lg' placeholder='johndoe' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
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
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel><div className='lg:text-xl sm:text-lg'>Re-enter Password</div></FormLabel>
                <FormControl>
                  <Input
                    placeholder='Re-Enter your password'
                    className='w-64 shadow-lg'
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
        </div>
        <div className='flex flex-col w-full justify-center items-center mt-6'>
          <Button className='w-max text-md shadow-inner' type='submit'>
            Sign up
          </Button>
        </div>
      </form>
      <div className='mx-auto my-4 flex w-3/4 items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        or
      </div>
      <div className='flex justify-center items-center text-gray-600 my-2 text-sm'>
        <div>
          Already have an account ?, please&nbsp;
          <Link className='text-blue-500 hover:underline' href='/sign-in'>
            Sign in
          </Link>
        </div>
      </div>
    </Form>
    </div>
  );
};

export default SignUpForm;