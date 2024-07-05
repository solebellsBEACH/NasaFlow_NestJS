import { Injectable, PipeTransform } from '@nestjs/common';
import {
  ResponsePattern,
  ResponsePatternPipeParams,
} from './response-pattern.interface';
import { ResponseActions, ResponseTypes } from '@shared/interfaces/response-type.interfaces';
import { ResponseDescriptions } from '@shared/constants/response/response-descriptions';

@Injectable()
export class ResponsePatternPipe implements PipeTransform {
  transform(value: ResponsePatternPipeParams<any>): ResponsePattern<any> {
    const description = this._setDescription(value.entityName || "entity", value.responseType, value.action)
    const error = value.responseType == ResponseTypes.error
    return { description, error, data: value.data };
  }

  private _setDescription(entityName: string, responseType: ResponseTypes, action: ResponseActions): string {
    return ResponseDescriptions.cruds[responseType][action] + entityName
  }

}
