'use client'
import {useSearchParams} from 'next/navigation'

const errors = {
  Signin: 'Try signing with a different account.',
  OAuthSignin: 'Try signing with a different account.',
  OAuthCallback: 'Try signing with a different account.',
  OAuthCreateAccount: 'Try signing with a different account.',
  EmailCreateAccount: 'Try signing with a different account.',
  Callback: 'Try signing with a different account.',
  OAuthAccountNotLinked:
    'To confirm your identity, sign in with the same account you used originally.',
  EmailSignin: 'Check your email address.',
  CredentialsSignin:
    'Sign in failed. Check the details you provided are correct.',
  default: 'Unable to sign in.',
};

type Options = keyof typeof errors

export default function SigninError() {
  const searchParams = useSearchParams()
  
  const error = searchParams.get('error')
  const message = error && (errors[error as Options] ?? errors.default)

  return (<p className='text-negative text-text text-center'>{error ? message : ''}</p>)
}