import clientPromise from './mongodb'
import { ObjectId } from 'mongodb'

const parseRequestBody = body => {
  if (typeof body === 'string') {
    try {
      return JSON.parse(body)
    } catch (err) {
      throw new Error('Invalid JSON format')
    }
  } else {
    return body
  }
}

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db('recipe_generator_db')

  try {
    switch (req.method) {
      case 'GET':
        const userEmail = req.query.user
        const data = await db
          .collection('recipe')
          .find({ user: userEmail })
          .toArray()
        return res.json(data)

      case 'POST':
        const recipe = parseRequestBody(req.body)
        const result = await db.collection('recipe').insertOne(recipe)

        if (result.acknowledged) {
          if (result.ops && result.ops.length > 0) {
            return res.status(201).send(result.ops[0])
          } else if (result.insertedId) {
            return res.status(201).send({ _id: result.insertedId })
          } else {
            throw new Error('Unexpected database response.')
          }
        } else {
          throw new Error('Insertion was not acknowledged by the database.')
        }

      case 'PUT':
        const { id, ...recipeUpdate } = req.body
        if (!id) {
          return res.status(400).send('ID is required')
        }
        await db
          .collection('recipe')
          .updateOne({ _id: new ObjectId(id) }, { $set: recipeUpdate })
        return res.status(200).send({ message: 'Recipe updated successfully' })

      case 'DELETE':
        const { id: deleteId } = req.body
        if (!deleteId) {
          return res.status(400).send('ID is required')
        }
        await db.collection('recipe').deleteOne({ _id: new ObjectId(deleteId) })
        return res.status(200).send({ message: 'Recipe deleted successfully' })

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
