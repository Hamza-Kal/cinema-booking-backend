import Joi from "joi";
import constants from "../../utils/constants";
import { objectIdSchema } from "../../utils/validation";
import { ICreateSeat } from "./dto";

const validationSchemas = {
  create: Joi.object<ICreateSeat>({
    seat_number: Joi.number().required(),
    row: Joi.number().required(),
    cinema_hall_id: Joi.string()
      .max(constants.DEFAULT_STRING_MAX_LEN)
      .required(),
    is_available: Joi.boolean().required(),
  }),

};

export default validationSchemas;
