import Joi from 'joi';
import mongoose, { Document, Model, Schema } from 'mongoose';
interface IMagicMover extends Document {
    name: string;
    weightLimit: number;
    questState: 'resting' | 'loading' | 'on-mission';
  }
  const magicMoverSchema: Schema = new Schema({
    name: {
      type: String,
      required: true,
    },
    weightLimit: {
      type: Number,
      required: true,
    },
    questState: {
      type: String,
      enum: ['resting', 'loading', 'on-mission'],
      default: 'resting',
    },
  });
  
  
  export const magicMoverValidationSchema = Joi.object({
    name: Joi.string().required().min(1).max(255).messages({
      'string.empty': 'Name is required',
      'string.max': 'Name must not exceed 255 characters',
    }),
    weightLimit: Joi.number().required().min(1).messages({
      'number.base': 'Weight limit must be a number',
      'number.greater': 'Weight limit must be greater than 0',
    }),
    questState: Joi.string().valid('resting', 'loading', 'on-mission').default('resting').messages({
      'string.valid': 'Quest state must be one of "resting", "loading", or "on-mission"',
    })
  });
  
  const MagicMover: Model<IMagicMover> = mongoose.model<IMagicMover>('MagicMover', magicMoverSchema);

export default MagicMover;
