import { errorCodes } from "../../utils/error";
import Exception from "../../utils/exception";
import { statusCodes } from "../../utils/status";

export class ScreeningErrors {
    constructor(){}

    notFound(overrideMessage?:string): Exception {
        const error = new Exception({
            errorCode: errorCodes.screening.notFound,
            message: overrideMessage || 'Screening not found',
            statusCode: statusCodes.NOT_FOUND,
        });
        return error;
    }

    alreadyExists(overrideMessage?:string): Exception {
        const error = new Exception({
            errorCode: errorCodes.screening.alreadyExist,
            message: overrideMessage || 'Screening already exists',
            statusCode: statusCodes.BAD_REQUEST,
        });
        return error;
    }

    invalidTime(overrideMessage?:string): Exception {
        const error = new Exception({
            errorCode: errorCodes.screening.invalidTime,
            message: overrideMessage || 'Invalid screening time',
            statusCode: statusCodes.BAD_REQUEST,
        });
        return error;
    }

    overlappingScreening(overrideMessage?:string): Exception {
        const error = new Exception({
            errorCode: errorCodes.screening.overlappingScreening,
            message: overrideMessage || 'Screening time conflicts with another screening',
            statusCode: statusCodes.CONFLICT,
        });
        return error;
    }
}
