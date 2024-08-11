import MagicMover, { magicMoverValidationSchema } from '../models/magicMover.model';

export const createMagicMover = async (moverData: any) => {
  const { name, weightLimit, questState } = moverData;
  const { error, value } = magicMoverValidationSchema.validate(
    { name, weightLimit, questState }, 
    { abortEarly: false }
  );
  if (error) {
    throw  error;
  }
  const newMover = new MagicMover(value);
  await newMover.save();
  return newMover;
};
