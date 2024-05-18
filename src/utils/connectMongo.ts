import mongoose from 'mongoose'

const connectMongo = async () =>
  mongoose.connect(process.env.EC2_MONGO_URI as string, {
    dbName: process.env.NODE_ENV === 'production' ? 'wakcraft' : 'wakcraft-test',
  })

export default connectMongo
