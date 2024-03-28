import { cn } from '@/lib/utils'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from '@/context/authContext'
import { BackgroundBeams } from '@/components/ui/background-beams'

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
        <AuthProvider>
          <Navbar/>
          <div className="flex flex-col">
              <main className="flex-1">
                {children}                
              </main>
              <Footer />
          </div>
          <Toaster/>
        </AuthProvider>
      </body>
    </html>
  )
}
