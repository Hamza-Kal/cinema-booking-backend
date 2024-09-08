import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';


dotenv.config();

const mongoUri = process.env.MONGO_URI; 
const port = process.env.PORT || 3000;  

mongoose.connect(mongoUri!)
  .then(() => {
    console.log('Connected to MongoDB');  
    
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);  
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);  
  });