import {Ubuntu} from '@next/font/google'
import DisplayName from "./DisplayName"
import { Icons } from "../Icons"

const { Logo } = Icons

const ubuntu = Ubuntu({weight: ['700'], subsets: ['latin']})

export default function Header() {

 return (
    <header>
      <h1 className={`text-8xl relative z-10 text-center text-textBlack ${ubuntu.className}`}>Dev<Logo className="z-10 inline"/>te</h1>
      <DisplayName />
    </header>
  )
}