export class ApiResult<T> {
  data: T[];
  count: number;
  errors: {
    message: string;
    validations: object;
  }
}
