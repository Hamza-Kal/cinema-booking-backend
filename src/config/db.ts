import mongoose from 'mongoose';
import { config } from './config';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.db.uri, {
      serverSelectionTimeoutMS: 3000,
    });
    mongoose.set('strictPopulate', false);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: `, error);
    process.exit(1);
  }
};

export default connectDB;
