function conflictError(message: string) {
  return {
    status: 409,
    message: message,
  };
}

function unauthorizedError(message: string) {
  return {
    status: 401,
    message: message,
  };
}

export { conflictError, unauthorizedError };
