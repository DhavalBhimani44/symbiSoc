import Navbar from '@/components/Navbar';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { url } from 'inspector';
import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <div className='bg-neutral-950 px-10 py-24 relative antialiased'>
        <div className='relative z-10'>
        {children}
        </div>
        <BackgroundBeams/>
      </div>
    </>
  )
};

export default AuthLayout;