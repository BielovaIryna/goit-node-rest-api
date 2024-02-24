import { serverConfig } from "../configs/serverConfig.js";
import HttpError from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrraper.js";
import { Users } from "../models/usersModel.js";
import jwt from "jsonwebtoken";




const checkRegisterData = ctrlWrapper (async (req, res, next)=>{

const {email}=req.body;
const isUserExist =await Users.exists({email:email});
if(isUserExist)throw HttpError(409, "Email in use")
next();
})
const auth = async(req, res, next) =>{
    
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer') {
      next(HttpError(401, 'Not authorized'));
    }
    try {
      const { id } = jwt.verify(token, serverConfig.jwtSecret);
     
      const user = await Users.findById(id);
     
      if (!user || user.token !== token || !user.token) {
        next(HttpError(401, 'Not authorized'));
      }
      req.user = user;
      next();
    } catch {
      next(HttpError(401, 'Not authorized'));
    }
}

  
const uploadAvatar = async (req, res, next)=>{

}
    


  
export {checkRegisterData, auth, uploadAvatar}