import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/db/mongoose";
import bcrypt from 'bcrypt'
import { SignDataFromDB } from "types";
import User from "@/db/models/user";

export default function handler (req: NextApiRequest, response: NextApiResponse) {
  const {body, method} = req

  
  return new Promise<void>(resolve => {
    if (method === 'POST') {
      const {password, username} = body
      delete body?.from

      const asyncTask = async ():Promise<SignDataFromDB | null> =>{ // must populate notes and reminders
        try {
          await dbConnect()
          const userFound = await User.findOne({name: username})
          if (userFound) {
            const isOk = bcrypt.compareSync(password, userFound.passwordHash)
            if (isOk) {
              const {_id, __v, ...all} = userFound._doc
              return all
            }
          }
          return null
        } catch (err) {
          console.log(err)
          return null
        }
      }

      if (password.length > 0 && username.length > 0) {
        asyncTask().then(res => {
          if (res) {
            response.status(200).json(res)
            return resolve()
          } else {
            response.status(401).end()
            return resolve()
          }
        }).catch(console.log)
      } else {
        response.status(400).end()
        return resolve()
      }
    } 
  })
}