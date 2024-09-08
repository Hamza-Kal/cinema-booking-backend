import { errorCodes } from "../../utils/error";
import Exception from "../../utils/exception";
import { statusCodes } from "../../utils/status";

export class CinemaHallErrors {
    constructor(){}
    notFound(overrideMessage?:string):Exception{
        const error = new Exception({
            errorCode:errorCodes.cinemaHall.notFound,
            message:overrideMessage || 'Not found',
            statusCode:statusCodes.NOT_FOUND
        });
        return error;
    }
    alreadyExists(overrideMessage?:string):Exception{
        const error = new Exception({
            errorCode:errorCodes.cinemaHall.alreadyExist,
            message:overrideMessage || 'Already exists',
            statusCode:statusCodes.BAD_REQUEST
        });
        return error ; 
    }
}