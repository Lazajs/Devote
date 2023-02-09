'use client'

import {usePathname} from 'next/navigation'
import { useSession, signIn, signOut } from "next-auth/react"
import { Icons } from "../Icons"

const {Out, In} = Icons

export default function DisplayName () {
  const pathname = usePathname()
  const {data} = useSession()

  return (
    <>
      <h2 className="text-2xl text-center text-textBlack font-bold"> {data?.user?.userData?.name ? data.user?.userData.name: 'Be a developer'}</h2>
      {!(pathname !== '/') && (data?.user === undefined ? 
          <In className="block m-auto mt-10 md:absolute md:top-2 md:left-8 z-10 cursor-pointer" onClick={()=> signIn()}  />
            :
          <Out className="block m-auto mt-10 md:absolute md:top-2 md:left-8 z-10 cursor-pointer" onClick={()=> signOut()} />
      )}
    </>
  )
}