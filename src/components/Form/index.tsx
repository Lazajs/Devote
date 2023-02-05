'use client'

import { ReactNode, SyntheticEvent } from "react"
import { Icons } from "../Icons"
import { useRouter } from "next/navigation"

const {Back, Github} = Icons

interface FormProps {
  children: ReactNode,
  handleSubmit: (e: SyntheticEvent)=> Promise<void>,
  from: 'Sign In' | 'Sign Up',
  to: 'Sign In' | 'Sign Up'
}

export default function Form ({children, handleSubmit, from, to}: FormProps) {
  const router = useRouter()

  return (
     <section className="h-96 w-full max-w-2xl z-10 block m-auto mt-12 ">
      <Back className="block m-auto cursor-pointer" onClick={()=> router.back()} />
      <form className="w-full h-full flex items-center justify-center flex-col m-auto mt-6">
        {children}
      <span className="flex justify-center align-center p-2 bg-primary rounded-full m-1 cursor-pointer" ><Github className="invert" /></span>
      <button type="submit" className="w-3/4 bg-primary text-textWhite p-4 block mt-2" onClick={handleSubmit}>{from}</button>
      <p className="text-bold text-base m-6 cursor-pointer" onClick={()=> router.replace(`/auth/${to.toLocaleLowerCase().replace(' ', '')}`)}>or {to}</p>
      </form>
    </section>
  )
}