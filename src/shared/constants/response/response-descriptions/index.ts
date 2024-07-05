
import { ErrorResponseDescriptions } from "./error-response-descriptions";
import { SuccessResponseDescriptions } from "./success-response-descriptions";

export const ResponseDescriptions = {
    cruds: {
        error: ErrorResponseDescriptions,
        warning: ErrorResponseDescriptions,
        success: SuccessResponseDescriptions
    }
}