'use client'
import { useSession } from "next-auth/react"
import Header from "@/components/Header"

export default function Home () {
  const {data: session, status} = useSession()
  console.log(session)

  return (
    <>
      <Header status={status} name={session?.user?.name}/>
    </>
  )
}