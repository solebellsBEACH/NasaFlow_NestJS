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

  transform(value: ResponsePatternPipeParams<any>): ResponsePattern<any> {
    const description = this._getFormattedDescription(
      value.entityName || 'entity',
      value.responseType,
      value.action,
      value.description,
    );
    const error = value.responseType == ResponseTypes.error;

    return { description, error, data: value.data }
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
