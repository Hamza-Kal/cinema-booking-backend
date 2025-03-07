import { errorCodes } from '../../utils/error';
import Exception from '../../utils/exception';
import { statusCodes } from '../../utils/status';


export class UserErrors{
    constructor(){}
    notFound(overrideMessage?:string):Exception{
        const error = new Exception({
            errorCode:errorCodes.user.notFound,
            message:overrideMessage || 'Not found',
            statusCode:statusCodes.NOT_FOUND
        });
        return error;

    }

    alreadyExists(overrideMessage?:string):Exception{
        const error = new Exception({
            errorCode:errorCodes.user.alreadyExist,
            message:overrideMessage || 'Already exists',
            statusCode:statusCodes.BAD_REQUEST
        });
        return error ; 
    }
    invalidCredentials(overrideMessage?:string):Exception{
        const error = new Exception({
            errorCode:errorCodes.login.invalidCredentials,
            message:overrideMessage || 'Invalid credentials',
            statusCode:statusCodes.NOT_FOUND
        });
        return error ; 
    }

  
}  