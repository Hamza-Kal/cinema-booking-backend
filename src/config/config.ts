import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,  // Fallback to port 3000 if not specified in .env
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/myapp',  // Default URI if not specified in .env
};
