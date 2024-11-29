export const customError = (context) => class extends Error {
  constructor (message, options) {
    super(`${context}:${message}`, options);
  }
};
