import Image from "next/image"
import logo from 'public/images/logo.svg'
import {Ubuntu} from '@next/font/google'
import DisplayName from "./DisplayName"

const ubuntu = Ubuntu({weight: ['700'], subsets: ['latin']})

export default function Header() {

  return (
    <header>
      <h1 className={`text-8xl relative z-10 text-center text-textBlack ${ubuntu.className}`}>Dev<Image className="inline z-10" src={logo} alt='logo' />te</h1>
      <DisplayName />
    </header>
  )
}