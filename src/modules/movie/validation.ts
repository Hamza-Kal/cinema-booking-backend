import Joi from 'joi';
import constants from '../../utils/constants';
import { objectIdSchema } from '../../utils/validation';
import { ICreateMovie } from './dto';


const validationSchemas = {
    create: Joi.object<ICreateMovie> ({
       title: Joi.string().max(constants.DEFAULT_STRING_MAX_LEN).required(),
       duration:Joi.number().required(),
       genre: Joi.string().max(constants.DEFAULT_STRING_MAX_LEN).required(),
       releaseDate: Joi.string().required(),
    }),

   
}

export default validationSchemas;