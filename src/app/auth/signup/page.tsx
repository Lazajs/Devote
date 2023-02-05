'use client'

import { SyntheticEvent, useState } from "react"
import { signIn } from "next-auth/react"
import Form from "@/components/Form"


export default function Login () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState<string[]>(['', ''])
  const [passwordValue, confirmedValue] = password

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (username.length > 0 && passwordValue.length > 0 && passwordValue === confirmedValue) {
      await signIn('credentials', {
        username: username,
        password: passwordValue,
        from: 'signup',
        callbackUrl: '/',
        redirect: true,
      })
    }
  }

  return (
    <Form handleSubmit={handleSubmit} from='Sign Up' to="Sign In">
      <input onChange={({target})=> setUsername(target.value)} value={username} type="text" name="" placeholder="Username" className={`h-16 w-11/12 m-1 p-2 bg-primary placeholder:text-textWhite text-textWhite outline-none`}/>
      <input onChange={({target})=> setPassword([target.value, confirmedValue])} value={passwordValue} type="password" name="" placeholder="Password" className="h-16 w-11/12 m-1 p-2 bg-primary placeholder:text-textWhite text-textWhite border-none outline-none"/>
      <input onChange={({target})=> setPassword([passwordValue, target.value])} value={confirmedValue} type="password" name="" placeholder="Confirm Password" className="h-16 w-11/12 m-1 p-2 bg-primary placeholder:text-textWhite text-textWhite border-none outline-none"/>
    </Form>
  )
}