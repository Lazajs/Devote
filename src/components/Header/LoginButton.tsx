import { Icons } from "../Icons"
import { signIn } from "next-auth/react"
import SigninError from "../SigninError"
const {Github, Linkedin} = Icons

export default function LoginButton () {

  return (
    <>
      <div className="flex m-auto w-full justify-center items-center">
        <Github onClick={()=> signIn('github')} className='w-[60px] mt-8 h-[60px] cursor-pointer' />
        <Linkedin onClick={()=> signIn('linkedin')} className='w-[60px] h-[60px] cursor-pointer'/>
      </div>
      <SigninError />
    </>
  )
}