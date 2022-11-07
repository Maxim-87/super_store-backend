export default class ApiError extends Error {
  status;

  errors;

  constructor(status: number, message: string, errors: any) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError(errors?: any) {
    // eslint-disable-next-line no-magic-numbers
    return new ApiError(401, "User not authorization", errors);
  }

  static BadRequest(message: string, errors?: any) {
    // eslint-disable-next-line no-magic-numbers
    return new ApiError(400, message, errors);
  }
}
