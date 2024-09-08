import { statusCodes } from "../../utils/status";
import { ICreateUser, ILoginUser } from "./dto";
import { UserEntity } from "./entity/user.entity";
import UserService from "./service";
import { Request, Response } from 'express';
import { LoginEntity } from "./entity/login.entity";

const userService = new UserService();

const controllers = { 
    create: async (req: Request, res: Response) => {
        const dto = req.body as ICreateUser;

        try {
            const result = await userService.create({dto});
            const response = new UserEntity(result).serialize();
            res.status(statusCodes.PROCESSED || 201).json(response); // Use 201 if PROCESSED is invalid
        } catch (error) {
            res.status(statusCodes.SERVICE_UNAVAILABLE || 500).json({ error: error.message });
        }
    },
    login: async (req: Request, res: Response) => {
        const dto = req.body as ILoginUser;
     try{
    const result = await userService.login({dto});
    const response = new LoginEntity(result).serialize();
    res.status(statusCodes.OK || 200).json(response); // Use 201 if PROCESSED is invalid
        }catch (error) {
            res.status(statusCodes.SERVICE_UNAVAILABLE || 500).json({ error: error.message });
        }
    },
    getAll:async (req: Request, res: Response) => {
        try{
            const result = await userService.getAll();
            
            res.status(statusCodes.OK || 200).json(result); // Use 201 if PROCESSED is invalid
                }
                catch (error) {
                    res.status(statusCodes.SERVICE_UNAVAILABLE || 500).json({ error: error.message });
                }
    }
}

export default controllers;
