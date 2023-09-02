import clientPromise from './mongodb'
import { ObjectId } from 'mongodb'
import bcrypt from 'bcrypt'

export default async function clientHandler(req, res) {
  const userEmail = req.query.email
  const client = await clientPromise
  const db = client.db('recipe_generator_db')
  try {
    switch (req.method) {
      case 'GET':
        const data = await db.collection('user').findOne({ email: userEmail })
        return res.json(data)

      case 'POST':
        const { email, pass } = req.body
        const hashedPassword = await bcrypt.hash(pass, 10)
        const user = { email, pass: hashedPassword }

        const result = await db.collection('user').insertOne(user)

        if (result.acknowledged) {
          return res.status(201).send({ _id: result.insertedId, email })
        } else {
          throw new Error('Insertion was not acknowledged by the database.')
        }

      case 'PUT':
        const { id, newPassword, ...userUpdate } = req.body
        if (!id) {
          return res.status(400).send('ID is required')
        }
        if (newPassword) {
          userUpdate.pass = await bcrypt.hash(newPassword, 10)
        }
        await db
          .collection('user')
          .updateOne({ _id: new ObjectId(id) }, { $set: userUpdate })
        return res.status(200).send({ message: 'User updated successfully' })

      case 'DELETE':
        const { id: deleteId } = req.body
        if (!deleteId) {
          return res.status(400).send('ID is required')
        }
        await db.collection('user').deleteOne({ _id: new ObjectId(deleteId) })
        return res.status(200).send({ message: 'User deleted successfully' })

      default:
        return res.status(405).send({ message: 'Method not supported' })
    }
  } catch (error) {
    if (error.message === 'Invalid JSON format') {
      res.status(400).send({ message: error.message })
    } else {
      res.status(500).send({ message: `Database error: ${error.message}` })
    }
  }
}
