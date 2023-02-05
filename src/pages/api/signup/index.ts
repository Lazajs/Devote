// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import User from '@/db/models/user'
import bcrypt from 'bcrypt'
import dbConnect from '@/db/mongoose'
import { SignDataFromDB, SignData } from 'types'

export default async function handler( req: NextApiRequest, response: NextApiResponse<SignData> ) {
  const {method, body} = req

  if (body?.from) delete body.from
  if (body?.username && body?.password) {
    return new Promise<void>(resolve => {
      if (method === 'POST') {
          const {password} = body
          const passwordHash = bcrypt.hashSync(password, 10)
          delete body.password
          
          dbConnect().then(_res => {
            const newUser = new User({...body, passwordHash})
            User.findOne({username: newUser.username}).then(res => {
              if (!res) {
                newUser.save().then((res: SignDataFromDB) => {
                  const { __id, _v, ...all} = res
                  response.status(201).json(all)
                  return resolve()
                })
              } 
            })
          })
      }
      response.status(400)
      return resolve()
    })
  } 
}
