import mongoose from 'mongoose';

const MONGODB_URI =
'mongodb+srv://babul1946:babul@practice.n2ruz.mongodb.net/routine?retryWrites=true&w=majority'
// "mongodb://localhost:27017/routine"

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}