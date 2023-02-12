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

function notFoundError(message: string) {
  return {
    status: 404,
    message: message,
  };
}

export { conflictError, unauthorizedError, notFoundError };
