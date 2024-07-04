import { Injectable, PipeTransform } from '@nestjs/common';
import {
  ResponsePattern,
  ResponsePatternPipeParams,
} from './response-pattern.interface';

@Injectable()
export class ResponsePatternPipe implements PipeTransform {
  transform(value: ResponsePatternPipeParams<any>): ResponsePattern<any> {
    return { description: !!value.error ? 'Error !!' : "Success !!", error: !!value.error, data: value.data };
  }
}
