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
import { Select,SelectContent,SelectItem,SelectValue,SelectTrigger } from '../ui/select';
import Link from 'next/link';
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast";
import 'react-toastify/dist/ReactToastify.css';
import { FormSchema } from '@/app/validationSchema';

type FormSchema = z.infer<typeof FormSchema>

const SignUpForm = () => {
  const {toast} = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      userType: 'STUDENT',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      await axios.post('api/user/sign-up', values);
      toast({
        duration: 2000,
        description: 'User created successfully'
      })
      router.push('/sign-in');
    } catch (error: any) {
      toast({
        duration: 2000,
        description: 'User creation failed'
      })
      console.log("Following error occured: ", error);
    }
    
    console.log(values);
  };

  return (
    <div className='w-fit lg:w-1/4 xl:w-1/4 m-auto px-4 sm:px-2 md:px-4 lg:px-4 xl:px-4 py-2 flex flex-col justify-center items-center shadow-2xl bg-gradient-to-l from-red-300 to-red-200'>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col justify-center items-center py-1'>
        <div className='flex flex-col w-full h-3/4 space-y-6 justify-center items-center'>
          <div className='flex w-full sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4 justify-center items-center'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel><div className='lg:text-xl sm:text-lg'>Username</div></FormLabel>
                  <FormControl>
                    <Input className='w-48 sm:w-56 md:w-56 lg:w-56 xl:w-64 shadow-lg' placeholder='Username' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex w-full sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4 justify-center items-center'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel><div className='lg:text-xl sm:text-lg'>Email</div></FormLabel>
                  <FormControl>
                    <Input className='w-48 sm:w-56 md:w-56 lg:w-56 xl:w-64 shadow-lg' placeholder='mail@sitpune.edu.in' {...field} />
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
                  <FormLabel><div className='lg:text-xl sm:text-lg'>Password</div></FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      className='w-48 sm:w-56 md:w-56 lg:w-56 xl:w-64 shadow-lg'
                      placeholder='Enter your password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex w-full sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4 justify-center items-center'>
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel><div className='lg:text-xl sm:text-lg'>Re-enter Password</div></FormLabel>
                <FormControl>
                  <Input
                    placeholder='Re-Enter your password'
                    className='w-48 sm:w-56 md:w-56 lg:w-56 xl:w-64 shadow-lg'
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          <div className='flex w-full sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4 justify-center items-center'>
            <FormField 
              control={form.control}
              name='userType'
              render={({ field }) => (
              <FormItem>
                <FormLabel><div className='lg:text-xl sm:text-lg'>User Type</div></FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={(selectedValue) => form.setValue('userType', selectedValue)}>
                      <SelectTrigger className="w-48 sm:w-56 md:w-56 lg:w-56 xl:w-64 shadow-lg">
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
          <Button 
            className='w-max h-fit text-md shadow-inner' 
            type='submit'
          >
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