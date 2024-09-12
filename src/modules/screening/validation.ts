import Joi from "joi";
import { objectIdSchema } from "../../utils/validation"; // Assuming objectIdSchema is used for validating MongoDB ObjectId
import constants from "../../utils/constants";
import { IScreening } from "./db/model";

const validationSchemas = {
  create: Joi.object<IScreening>({
    name: Joi.string().required(),
    movie_id: objectIdSchema.required(),
    cinema_hall_id: objectIdSchema.required(),
    start_time: Joi.date().required(),
    end_time: Joi.date().greater(Joi.ref('start_time')).required(), // Ensure end_time is after start_time
    available_seats: Joi.array().items(objectIdSchema), // Array of ObjectIds for seats
    total_seats: Joi.number().integer().min(1).required(), // Ensure at least 1 seat
    created_at: Joi.date().default(Date.now), // Default is handled by the schema but can be validated
    updated_at: Joi.date().default(Date.now), // Default is handled similarly
  }),
};

export default validationSchemas;
