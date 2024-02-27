import { nanoid } from "nanoid";
import HttpError from "../helpers/HttpError.js";
import { Users } from "../models/usersModel.js";
import { registerToken } from "./jwtServices.js";
import bcrypt from 'bcryptjs';

const userRegister = async(userData)=>{
    const pssHash = await bcrypt.hash(userData.password, 10);
    const verificationToken = nanoid();
    
    const newUser = await Users.create ({...userData, password:pssHash, verificationToken});
  
        return {user: {email:newUser.email, subscription:newUser.subscription}}

}
const userLogin= async ({email, password}) =>{
    
    const user = await Users.findOne({email});
    
    if (!user) throw HttpError (401, "Email or password is wrong");
    
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) throw HttpError (401, "Email or password is wrong");
    const token =registerToken(user.id);
    await Users.findByIdAndUpdate(user.id, { token });
    
    return({token, user:{email:user.email, subscription:user.subscription}})
}
 


export{userRegister, userLogin}   
