'use client'

import { useContext } from "react"
import { UserLoggedCTX } from "@/Providers/UserLoggedProvider"
import Image from "next/image"

export default function ClientElements () {
  const {username} = useContext(UserLoggedCTX)
  
  return (
    <>
      <h2 className="text-2xl text-center">{username ? username : 'Be a developer'}</h2>
      <Image className="block m-auto mt-10 md:absolute md:top-2 md:left-8 z-10" width={50} height={50} src={username ? '/images/out.svg' : '/images/signin.svg'} alt='account'/>
    </>
  )
}