// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import User from '@/db/models/user'
import Product from '@/db/models/product'
import bcrypt from 'bcrypt'
import dbConnect from '@/db/mongoose'
import { ProductData } from 'types'

export default async function handler( req: NextApiRequest, response: NextApiResponse<ProductData> ) {
  const {method, body} = req
  if (body?.from) delete body.from

  if (body?.username && body?.password) {
    return new Promise<void>(resolve => {

      if (method === 'POST') {
          const {password} = body
          const passwordHash = bcrypt.hashSync(password, 10)
          delete body.password

        const asyncTask = async ():Promise<ProductData | null> => {
          try {
            await dbConnect()
            body.name = body.username
            delete body.username
            const newUser = new User({...body, passwordHash})
            const foundUser = await User.findOne({name: newUser.name})
            if (!foundUser) {
              const dbData = await newUser.save()
              const rawProduct = new Product({user: dbData._doc._id})
              await rawProduct.save()
              const populatedProduct = await Product.findById(rawProduct._doc._id).populate('user')
              const {user, _id, __v} = populatedProduct

              return {id: _id, userData: {id: user._id, name: user.name}}
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
