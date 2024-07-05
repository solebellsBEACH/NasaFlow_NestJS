import { Injectable } from '@nestjs/common';
import { ResponseActions, ResponseTypes } from '@shared/interfaces/response-type.interfaces';
import { ResponsePattern } from '@shared/pipes/response-pattern/response-pattern.interface';
import { ResponsePatternPipe } from '@shared/pipes/response-pattern/response-pattern.pipe';

@Injectable()
export class ResponsePatternService {

    constructor(
        private readonly _responsePatternPipe: ResponsePatternPipe,
    ) { }

    getResponse(response: Promise<any>, entityName: string): Promise<ResponsePattern<any>> {

        return response.then((data) => {
            return this._responsePatternPipe.transform({
                responseType: ResponseTypes.success,
                data,
                entityName,
                action: ResponseActions.create
            });
        })
            .catch((error) => {
                return this._responsePatternPipe.transform({
                    responseType: ResponseTypes.error,
                    data: error,
                    action: ResponseActions.create,
                    entityName,
                    description: error?.driverError?.detail,
                });
            });
    }
}
