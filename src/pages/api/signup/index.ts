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

        const asyncTask = async ():Promise<SignDataFromDB | null> => { //Must populate notes and reminders
          try {
            await dbConnect()
            body.name = body.username
            delete body.username
            const newUser = new User({...body, passwordHash})
            const found = await User.findOne({name: newUser.name})
            if (!found) {
              const dbData = await newUser.save()
              const {_id, __v, ...all} = dbData._doc
              return {...all, id: _id}
            } 
            return null
          } catch(err) {
            console.log(err)
            return null
          }
        }

        asyncTask().then(res => {
          if (res) {
            response.status(201).json(res)
            return resolve()
          } else {
            response.status(400).end() //bad request
            return resolve()
          }
        })
      }
    })
  } 
}
