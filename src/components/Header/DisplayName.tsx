import Image from "next/image"

export default function ClientElements () {
  return (
    <>
      <h2 className="text-2xl text-center">{'Be a developer'}</h2>
      <Image className="block m-auto mt-10 md:absolute md:top-2 md:left-8 z-10" width={50} height={50} src={'/images/signin.svg'} alt='account'/>
    </>
  )
}