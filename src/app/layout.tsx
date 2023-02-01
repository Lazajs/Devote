import './globals.css'
import Image from "next/image"
import topBg from 'public/images/top-bg.svg'
import bottomBg from 'public/images/bottom-bg.svg'
import { Poppins } from '@next/font/google'
import UserLoggedProvider from '@/Providers/UserLoggedProvider'

const poppins = Poppins({subsets: ['latin'], weight: ['400']})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body className={`bg-background w-screen h-screen ${poppins.className}`}>
        <UserLoggedProvider>
          <main className='max-w-7xl block m-auto w-11/12 relative'>
            {children}
          </main>
        </UserLoggedProvider>
        <Image priority src={bottomBg} className="absolute top-0 right-0 min-w-full max-h-40 select-none z-0 rotate-180" alt='background' />
        <Image priority className="absolute bottom-0 min-w-full max-h-96 select-none z-0 lg:max-h-40 sm:max-h-28" src={topBg} alt='background' />
        </body>
    </html>
  )
}
