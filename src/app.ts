import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import { errorMiddleware } from './middlewares/error.middleware';
import dotenv from 'dotenv';
import magicMoverRoutes from './routes/magicMover.route';

const app: Application = express();

dotenv.config();  
app.use(helmet());
app.use(morgan('dev'));


app.use(express.json());

app.use('/api', magicMoverRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('API is running...');
});



export default app;
