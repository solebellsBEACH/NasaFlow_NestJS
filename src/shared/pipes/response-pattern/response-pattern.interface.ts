import { ResponseTypes } from '../../interfaces/response-type.interfaces';

export interface ResponsePatternPipeParams<T> {
  responseType: ResponseTypes;
  data: T;
  error?: boolean;
  description?: string;
}

export interface ResponsePattern<T> {
  data: T;
  error?: boolean;
  description?: string;
}
