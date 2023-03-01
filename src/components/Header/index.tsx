import {Ubuntu} from '@next/font/google'
import { Icons } from "../Icons"
import { AuthState } from 'types'
import { signOut } from 'next-auth/react'
import LoginButton from './LoginButton'

const { Logo, Out } = Icons

const ubuntu = Ubuntu({weight: ['700'], subsets: ['latin']})

export default function Header({status, name}: {status: AuthState, name?: string}) {

 return (
    <header>
      <h1 className={`text-title whitespace-nowrap relative z-10 text-center text-textBlack ${ubuntu.className}`}>Dev<Logo className="z-10 inline"/>te</h1>
      {name ? <small className='text-text block text-center mb-small font-heavy'>{name}</small> : ''}
      <span>
        {
          status === 'authenticated' ?  <Out onClick={()=> signOut()} className='block mt-small m-auto scale-90' /> : <LoginButton />
        }
      </span>
    </header>
  )
}