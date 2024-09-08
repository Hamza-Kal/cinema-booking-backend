import Joi from 'joi';
import constants from '../../utils/constants';
import { objectIdSchema } from '../../utils/validation';
import { ICreateUser, ILoginUser } from './dto';


const validationSchemas = {
    create: Joi.object<ICreateUser> ({
        name: Joi.string().max(constants.DEFAULT_STRING_MAX_LEN).required(),
        phone:Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        is_admin: Joi.boolean(),
    }),

    login: Joi.object<ILoginUser>({
        name: Joi.string().max(constants.DEFAULT_STRING_MAX_LEN).required(),
        password: Joi.string().required(),
    })
}

export default validationSchemas;