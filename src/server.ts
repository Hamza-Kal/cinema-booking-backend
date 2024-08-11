import app from './app';  // Import the Express app from app.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const mongoUri = process.env.MONGO_URI;  // Get the MongoDB URI from environment variables
const port = process.env.PORT || 3000;   // Get the port from environment variables or default to 3000

// Connect to MongoDB
mongoose.connect(mongoUri!)
  .then(() => {
    console.log('Connected to MongoDB');  // Log successful connection to the database
    
    // Start the Express server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);  // Log the port the server is running on
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);  // Log any errors that occur during database connection
  });
