'use client'

import { createContext, ReactNode, useState } from "react";

interface UserLogged {
  username?: string
}

export const UserLoggedCTX = createContext<UserLogged>({})


export default function UserLoggedProvider ({children}: {children: ReactNode}) {
  const [username, setUsername] = useState('lazaro')

  return (
    <UserLoggedCTX.Provider value={{username: username}}>
      {children}
    </UserLoggedCTX.Provider>
  )
}