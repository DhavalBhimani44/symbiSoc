import { cn } from '@/lib/utils'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'symbiSoc',
  description: 'Hassle free registration for your event.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='light'>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={cn(
        'min-h-screen font-sans antialiased grainy', 
        inter.className
      )}>
        <Navbar/>
        {children}
        <Footer/>
        <Toaster/>
      </body>
    </html>
  )
}
