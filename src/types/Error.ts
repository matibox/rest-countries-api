export type Error = {
  status: number;
  message: string;
};

export function isError(object: unknown): object is Error {
  return (
    typeof object === 'object' &&
    object !== null &&
    'status' in object &&
    'message' in object
  );
}
