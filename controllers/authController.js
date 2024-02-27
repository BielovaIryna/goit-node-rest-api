
import { ctrlWrapper } from "../helpers/ctrlWrraper.js";
import { Users } from "../models/usersModel.js";
import { userLogin, userRegister } from "../services/usersServices.js";
import path from 'path';
import {jimpImg } from "../helpers/jimps.js";
import fs from 'fs/promises';
import { fileURLToPath } from 'url';


import { serverConfig } from "../configs/serverConfig.js";
import { sendEmail } from "../helpers/sendEmail.js";
import HttpError from "../helpers/HttpError.js";
import { log } from "console";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = ctrlWrapper(async(req, res)=>{
    const {user} = await userRegister(req.body);
    
    const verifyEmail = {
        to: user.email,
        subject: "Verify email",
        html: `<a target="_blank" href="${serverConfig.baseURL}/api/users/verify/${user.verificationToken}">Click to verify email</a>`,
      };
  
      await sendEmail(verifyEmail);
    res.status(201).json({
       user})
});

const verifyEmail = ctrlWrapper(async (req, res, next) => {

      const { verificationToken } = req.params;
   
      const user = await Users.findOne({ verificationToken: verificationToken });
     
      if (user === null) {
        throw HttpError(404, "User not found");
      }
      await Users.findByIdAndUpdate(user._id, {
        verify: true,
        verificationToken: null,
      });
      res.status(200).json({
        message: "Verification successful",
      });
    
  });
  
  const resendVerifyEmail =ctrlWrapper( async (req, res) => {
    
      const { email } = req.body;
      const user = await Users.findOne({ email });
      if (user === null) {
        throw HttpError(400, "missing required field email");
      }
  
      if (user.verify) {
        throw HttpError(400, "Verification has already been passed");
      }
      const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${serverConfig.baseURL}/api/users/verify/${user.verificationToken}">Click to verify email</a>`,
      };
  
      await sendEmail(verifyEmail);
  
      res.json({ message: "Verification email sent" });
    
  });
  
const login = ctrlWrapper (async(req, res) =>{
    
    const {token, user} = await userLogin(req.body);
   

    res.status(200).json({
        token,
        user
    });
})

const logout = ctrlWrapper(async(req, res)=>{
    await Users.findByIdAndUpdate(req.user.id, { token: " " });

    res.status(204).send("Logout success");

})
const current =async(req, res)=>{
    const { email, subscription } = req.user;
    res.status(200).json({ email, subscription });
}

const updateAvatar = async(req, res)=>{
    
        const { _id } = req.user;
       
        if (req.file === undefined)
          throw HttpError(404, "Image was not found, check form-data values");
        const { path: tmpUpload, originalname } = req.file;
        await jimpImg(tmpUpload);
        const fileName = `${_id}${originalname}`;
        const resultUpload = path.join(avatarsDir, fileName);
        await fs.rename(tmpUpload, resultUpload);
        const avatarURL = path.join("/avatars", fileName);
        await Users.findByIdAndUpdate(_id, { avatarURL });
    
        res.status(200).json({ avatarURL });
      
}
export {register, login, logout, current, updateAvatar, verifyEmail, resendVerifyEmail}