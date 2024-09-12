import { Request, Response, NextFunction } from 'express';

export const errorCodes = {
  user: {
    notFound: 1000,
    alreadyExist: 1001,
  },
  login: {
    invalidCredentials: 2000,
  },
  movie: {
    notFound: 3000,
    alreadyExist: 3001,
  },
  cinemaHall: {
    notFound: 4000,
    alreadyExist: 4001,
  },
  seat: {
    notFound: 5000,
    alreadyExist: 5001,
  },
  screening: {
    notFound: 6000,
    alreadyExist: 6001,
    invalidTime: 6002,             // Added error code for invalid screening time
    overlappingScreening: 6003,    // Added error code for overlapping screenings
  },
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error',
  });
};

export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
