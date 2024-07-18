import { Injectable, PipeTransform } from '@nestjs/common';
import {
  ResponsePattern,
  ResponsePatternPipeParams,
} from './response-pattern.interface';
import {
  ResponseActions,
  ResponseTypes,
} from '@shared/interfaces/response-type.interfaces';
import { responseDescriptions } from '@shared/constants/response/response-descriptions';

@Injectable()
export class ResponsePatternPipe implements PipeTransform {

  private _range = 5

  transform(value: ResponsePatternPipeParams<any>): ResponsePattern<any> {
    const description = this._getFormattedDescription(
      value.entityName || 'entity',
      value.responseType,
      value.action,
      value.description,
    );
    const listProperties = this._getListProperties(value.data)
    const error = value.responseType == ResponseTypes.error;
    const result = { description, error, data: value.data }

    return Array.isArray(result.data) ? { ...result, ...listProperties } : result
  }

  private _getListProperties(data: [], page?: number) {
    return {
      count: data.length,
      range: this._range,
      pages: Math.ceil(data.length / this._range),
      actualPage: page || 1
    }
  }

  private _getFormattedDescription(
    entityName: string,
    responseType: ResponseTypes,
    action: ResponseActions,
    description?: string,
  ): string {
    return description
      ? description
      : responseDescriptions.cruds[responseType][action] + entityName;
  }

}
