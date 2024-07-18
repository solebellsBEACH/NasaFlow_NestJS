import {
  ResponseActions,
  ResponseTypes,
} from '../../interfaces/response-type.interfaces';

export interface ResponsePatternPipeParams<T> {
  responseType: ResponseTypes;
  entityName?: string;
  data: T;
  description?: string;
  action: ResponseActions;
}

export interface ResponsePattern<T> {
  data: T;
  error: boolean;
  description: string;
  count?: number;
  range?: number;
  pages?: number;
  actualPage?: number;
}

export interface ResponseListProperties {
  count: number;
  range: number;
  pages: number;
  actualPage: number;
}
