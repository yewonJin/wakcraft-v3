import mongoose from 'mongoose'

const connectMongo = async () =>
  mongoose.connect(process.env.EC2_MONGO_URI as string, {
    dbName: 'wakcraft-test',
  })

export default connectMongo
