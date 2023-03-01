import {Ubuntu} from '@next/font/google'
import { Icons } from "../Icons"

const { Logo, Github } = Icons

const ubuntu = Ubuntu({weight: ['700'], subsets: ['latin']})

export default function Header({status}: any) {

 return (
    <header>
      <h1 className={`text-title relative z-10 text-center text-textBlack ${ubuntu.className}`}>Dev<Logo className="z-10 inline"/>te</h1>
      <span>
        <Github className='block m-auto scale-150' />

      </span>
    </header>
  )
}