import Navbar from '@/components/Navbar';
import { url } from 'inspector';
import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <div className='bg-slate-200 px-10 py-32 rounded-md' style={{ backgroundImage: 'url("/bg1.jpg")', backgroundPosition:'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundAttachment: 'fixed', height: '100', width: '100'} }>{children}</div>
    </>
  )
};

export default AuthLayout;