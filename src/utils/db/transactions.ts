import mongoose from 'mongoose';

interface TransactionArgs {
  [key: string]: any;
}

const transactionWrapper = async <T extends TransactionArgs>(
  fn: (args: T) => Promise<any>,
  args: Omit<T, 'session'>
): Promise<any> => {
  const session = await mongoose.startSession();
  let result;

  try {
    session.startTransaction();
    result = await fn({ ...args, session } as unknown as T);
    await session.commitTransaction();
    console.log('Transaction committed successfully.');
  } catch (error) {
    await session.abortTransaction();
    console.error('Transaction aborted due to an error:', error);
    throw error;
  } finally {
    session.endSession();
  }

  return result;
};

export default transactionWrapper;
