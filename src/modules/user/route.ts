import express from "express";
import { authMiddleware } from "../../middlewares/authenticationMiddleware";
import { RequestPropertyMiddlewareEnum } from "../../utils/enums";
import { asyncHandler } from "../../utils/error";
import { validateReqProperty } from "../../utils/validation";
import controllers from "./controller";
import validationSchemas from "./validation";

const router = express.Router();

router.post('',validateReqProperty(validationSchemas.create,RequestPropertyMiddlewareEnum.Body), asyncHandler(controllers.create))
router.post('/Login',validateReqProperty(validationSchemas.login,RequestPropertyMiddlewareEnum.Body), asyncHandler(controllers.login))
router.get('/getAll',authMiddleware,asyncHandler(controllers.getAll));

export default router;