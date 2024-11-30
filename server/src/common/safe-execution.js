import logger from 'loglevel';

export const safeExecution = async (cb) => {
  try {
    await cb()
  } catch (err) {
    logger.error(err);
  }
};
