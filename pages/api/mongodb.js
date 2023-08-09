import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = process.env.MONGODB_URI
console.log('MongoDB URI:', uri)

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}

let client
let clientPromise

try {
  if (process.env.NODE_ENV === 'development') {
    if (!client) {
      console.log('Attempting connection in development mode...')
      client = new MongoClient(uri, options)
      client
        .connect()
        .then(() => {
          console.log('Connected to MongoDB in development mode!')
        })
        .catch(error => {
          console.error('Error in development mode:', error.message)
        })
    }
    clientPromise = client
  } else {
    console.log('Attempting connection...')
    clientPromise = new MongoClient(uri, options)
    clientPromise
      .connect()
      .then(() => {
        console.log('Connected to MongoDB!')
      })
      .catch(error => {
        console.error('Connection error:', error.message)
      })
  }
} catch (error) {
  console.error('Error connecting to MongoDB:', error.message)
}

export default clientPromise
