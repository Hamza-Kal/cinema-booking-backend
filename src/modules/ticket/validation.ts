import Joi from 'joi';
import constants from '../../utils/constants';
import { objectIdSchema } from '../../utils/validation';
import { ICreateTicket } from './dto';


const validationSchemas = {
    create: Joi.object<ICreateTicket> ({
        userId: Joi.string().required(),
        screeningId:Joi.string().required(),
        seatId: Joi.string().required(),
    
    }),
}

export default validationSchemas;