import Joi from 'joi';
import constants from '../../utils/constants';
import { objectIdSchema } from '../../utils/validation';
import { ICreateCinemaHall } from './dto';


const validationSchemas = {
    create: Joi.object<ICreateCinemaHall> ({
       hall_name: Joi.string().max(constants.DEFAULT_STRING_MAX_LEN).required(),
       total_seats:Joi.number().required(),
       location: Joi.string().max(constants.DEFAULT_STRING_MAX_LEN).required(),
     
    }),

   
}

export default validationSchemas;