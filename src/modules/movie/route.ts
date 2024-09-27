import express from "express";
import { authMiddleware } from "../../middlewares/authenticationMiddleware";
import { RequestPropertyMiddlewareEnum } from "../../utils/enums";
import { asyncHandler } from "../../utils/error";
import { validateReqProperty } from "../../utils/validation";
import controllers from "./controller";
import validationSchemas from "./validation";
import multer from 'multer';
import path from 'path'; 

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads')); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });


const router = express.Router();

router.post(
  '',
  upload.single('image'), 
  validateReqProperty(validationSchemas.create, RequestPropertyMiddlewareEnum.Body),
  authMiddleware,
  asyncHandler(controllers.create)
);

router.get('/getAll', authMiddleware, controllers.getAll);

export default router;
