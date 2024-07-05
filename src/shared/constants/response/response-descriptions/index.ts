
import { ResponseDescriptions } from "@shared/interfaces/response-type.interfaces";
import { ErrorResponseDescriptions } from "./error-response-descriptions";
import { SuccessResponseDescriptions } from "./success-response-descriptions";

export const responseDescriptions: ResponseDescriptions = {
    cruds: {
        error: ErrorResponseDescriptions,
        warning: ErrorResponseDescriptions,
        success: SuccessResponseDescriptions
    }
}