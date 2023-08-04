import commonError from './commonError.interface';

export default interface commonResponse<T> {
  status?: number;
  data?: T;
  errorData?: commonError;
  error?: string;
}
