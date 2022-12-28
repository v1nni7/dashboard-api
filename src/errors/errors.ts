function conflictError(message: string) {
  return {
    status: 409,
    message: message,
  };
}

export { conflictError };
