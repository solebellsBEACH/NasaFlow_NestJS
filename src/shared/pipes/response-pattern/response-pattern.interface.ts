import { ResponseActions, ResponseTypes } from '../../interfaces/response-type.interfaces';

export interface ResponsePatternPipeParams<T> {
  responseType: ResponseTypes;
  entityName?: string;
  data: T;
  description?: string;
  action: ResponseActions
}

export interface ResponsePattern<T> {
  data: T;
  error: boolean;
  description: string;
}
