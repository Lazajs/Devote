'use client'

import { SyntheticEvent, useState } from "react"
import { signIn } from "next-auth/react"
import Form from "@/components/Form"
import type { FormError } from "types"
import {useRouter} from 'next/navigation'
import Loader from "@/components/Loader"

export default function Login () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<FormError>({from: 'none'})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const errorBorder = 'border-2 border-negative'
  const noneBorder = 'border-none'

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (username.length > 0 && password.length > 0) {
      setIsLoading(true)
      const res = await signIn('credentials', {
        username: username.trim(),
        password: password,
        from: 'signin',
        callbackUrl: '/',
        redirect: false,
      })

      if (res?.ok) {
        setIsLoading(false)
        router.push('/')
      }    
      else {
        setIsLoading(false)
        setError({from: 'all', message: `Error while trying to Sign In, your credentials may be invalid. (${res?.status})`})
      }
    }
  }

  if(isLoading) return <Loader />

  return (
    <Form handleSubmit={handleSubmit} from='Sign In' to='Sign Up'>
      <input onChange={({target})=> setUsername(target.value)} value={username} type="text" name="Username" placeholder="Username" className={`${error?.from === 'name' ? errorBorder : noneBorder} h-16 m-1 w-11/12 p-2 bg-primary placeholder:text-textWhite text-textWhite outline-none`}/>
      <input onChange={({target})=> setPassword(target.value)} value={password} type="password" name="Password" placeholder="Password" className={`${error?.from === 'password' ? errorBorder : noneBorder} h-16 w-11/12 m-1 p-2 bg-primary placeholder:text-textWhite text-textWhite outline-none`}/>
      {error?.message && <p className="m-4 text-negative text-center">{error.message}</p>}
    </Form>
  )
}