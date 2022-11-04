import ApiError from "../exceptions/api-error";

export default function ErrorMiddlewares(
  err: any,
  req: any,
  res: any,
  next: any
) {
  console.log(err);
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }

  // eslint-disable-next-line no-magic-numbers
  return res.status(500).json({ message: "unknown error" });
}
