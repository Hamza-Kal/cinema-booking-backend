import Joi from 'joi';
import mongoose, { Document, Model, Schema } from 'mongoose';
interface IMagicItem extends Document {
    name: string;
    weight: number;
  }
  const magicItemSchema: Schema = new Schema({
    name: {
      type: String,
      required: true,
      unique:true,
    },
    weight: {
      type: Number,
      required: true,
    },
   
  });
  
  
  export const magicItemValidationSchema = Joi.object({
    name: Joi.string().required().min(1).max(255).messages({
      'string.empty': 'Name is required',
      'string.max': 'Name must not exceed 255 characters',
    }),
    weight: Joi.number().required().greater(0).messages({
      'number.base': 'Weight limit must be a number',
      'number.greater': 'Weight limit must be greater than 0',
    }),
   
  });
  
  const MagicItem: Model<IMagicItem> = mongoose.model<IMagicItem>('MagicItem',magicItemSchema);

export default MagicItem;
