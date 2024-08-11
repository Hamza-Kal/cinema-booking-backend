import { Request, Response, NextFunction } from 'express';

// Custom error handling middleware
export const errorMiddleware = (
  err: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  console.error(err.stack); 
  res.status(500).json({
    message: 'Internal Server Error',  
    error: err.message,  
  });
};
