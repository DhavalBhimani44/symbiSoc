import {z} from "zod";

export const FormSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email')
      .refine((email) => email.endsWith('@sitpune.edu.in'), 
      { message: 'Please enter your college email id!' }),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have at least 8 characters')
      .refine((password) => {
        const hasUppercase = /[A-Z]/.test(password);

        const hasLowercase = /[a-z]/.test(password);

        const hasDigit = /\d/.test(password);
        return hasUppercase && hasLowercase && hasDigit;
      }, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, and one digit!',
      }),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match',
  });

export const signInSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required'),
    
    password: z
        .string()
        .min(1, 'Password is required'),
});