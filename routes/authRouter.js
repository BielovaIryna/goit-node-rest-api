import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerUserSchema } from "../schemas/usersSchemas.js";
import { register, login, logout, current} from "../controllers/authController.js";
import {auth, checkRegisterData } from "../middlewares/authMiddleware.js";
const authRouter =express.Router();
authRouter.post('/register', validateBody(registerUserSchema), checkRegisterData, register);
authRouter.post('/login', validateBody(registerUserSchema), login);
authRouter.post('/logout',auth, logout );
authRouter.get('/current', auth, current)
export default authRouter;