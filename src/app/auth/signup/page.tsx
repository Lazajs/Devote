'use client'

import { SyntheticEvent, useState } from "react"
import { signIn } from "next-auth/react"
import Form from "@/components/Form"
import { useRouter } from "next/navigation"
import type { FormError } from "types"
import Loader from "@/components/Loader"

export default function Login () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState<string[]>(['', ''])
  const [error, setError] = useState<FormError>({from: 'none'})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const [passwordValue, confirmedValue] = password
  const errorBorder = 'border-2 border-negative'
  const noneBorder = 'border-none'

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    setError({from: 'none'})
    
    if (passwordValue !== confirmedValue) setError({from: 'confirmed', message: 'Passwords doesn`t match'})
    if (!passwordValue || passwordValue.length < 5) setError({from: 'password', message: 'Password must be longer'})
    if (!username) setError({from: 'none'})
    
    if (username.length > 0 && passwordValue.length >= 5 && passwordValue === confirmedValue) {
      setIsLoading(true)
      const res = await signIn('credentials', {
        username: username.trim(),
        password: passwordValue,
        from: 'signup',
        callbackUrl: '/',
        redirect: false,
      })

      if (res?.ok) {
        setIsLoading(false)
        router.push('/')
      }    
      else {
        setIsLoading(false)
        setError({from: 'all', message: `Error while trying to Sign Up, your account is already created or your credentials are invalid. (${res?.status})`})
      }
    } 
  }

  if (isLoading) return <Loader />

  return (
    <Form handleSubmit={handleSubmit} from='Sign Up' to="Sign In">
      <input onChange={({target})=> setUsername(target.value)} value={username} type="text" name="" placeholder="Username" className={`${error?.from === 'name' ? errorBorder : noneBorder} h-16 m-1 w-11/12 p-2 bg-primary placeholder:text-textWhite text-textWhite outline-none`}/>
      <input onChange={({target})=> setPassword([target.value, confirmedValue])} value={passwordValue} type="password" name="" placeholder="Password" className={`${error?.from === 'password' ? errorBorder : noneBorder} h-16 m-1 w-11/12 p-2 bg-primary placeholder:text-textWhite text-textWhite outline-none`}/>
      <input onChange={({target})=> setPassword([passwordValue, target.value])} value={confirmedValue} type="password" name="" placeholder="Confirm Password" className={`${error?.from === 'confirmed' ? errorBorder : noneBorder} h-16 m-1 w-11/12 p-2 bg-primary placeholder:text-textWhite text-textWhite outline-none`}/>
      {error?.message && <p className="m-4 text-negative text-center">{error.message}</p>}
    </Form>
  )
}