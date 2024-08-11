import { Request, Response } from 'express';
import { createMagicMover } from '../services/magicMover.services';
import { ValidationError } from 'joi';

export const createMagicMoverController = async (req: Request, res: Response) => {
  try {
    const newMover = await createMagicMover(req.body);
    res.status(201).json(newMover);
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
};
