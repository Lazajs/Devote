'use client'

import { SyntheticEvent, useState } from "react"
import { signIn } from "next-auth/react"
import Form from "@/components/Form"

interface FormError {
  from: 'username' | 'password' | 'none',
  message?: string
}

export default function Login () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<FormError>()
  const errorBorder = 'border-2 border-negative'
  const noneBorder = 'border-none'

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    if (username.length > 0 && password.length> 0) {
      setError({from: 'none'})
      await signIn('credentials', {
        username: username,
        password: password,
        from:'signin',
        callbackUrl: '/',
        redirect: true,
      })
    } else if (username.length <= 0) {
      setError({from: 'username'})
    } else if (password.length <= 0) {
      setError({from: 'password'})
    }
  }

  return (
    <Form handleSubmit={handleSubmit} from='Sign In' to='Sign Up'>
      <input onChange={({target})=> setUsername(target.value)} value={username} type="text" name="Username" placeholder="Username" className={`${error?.from === 'username' ? errorBorder : noneBorder} h-16 m-1 w-11/12 p-2 bg-primary placeholder:text-textWhite text-textWhite outline-none`}/>
      <input onChange={({target})=> setPassword(target.value)} value={password} type="password" name="Password" placeholder="Password" className={`${error?.from === 'password' ? errorBorder : noneBorder} h-16 w-11/12 m-1 p-2 bg-primary placeholder:text-textWhite text-textWhite outline-none`}/>
    </Form>
  )
}