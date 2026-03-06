export interface ApiSuccess<T> {
  code: 0;
  message: 'success';
  data: T;
}

export function success<T>(data: T): ApiSuccess<T> {
  return {
    code: 0,
    message: 'success',
    data
  };
}
