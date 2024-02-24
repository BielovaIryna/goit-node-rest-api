
import { ctrlWrapper } from "../helpers/ctrlWrraper.js";
import { Users } from "../models/usersModel.js";
import { userLogin, userRegister } from "../services/usersServices.js";
import path from 'path';
import {jimpImg } from "../helpers/jimps.js";
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const avatarsDir = path.join(__dirname, "../", "public", "avatars")
const register = ctrlWrapper(async(req, res)=>{
    const {user} = await userRegister(req.body);
    res.status(201).json({
       user})
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
export {register, login, logout, current, updateAvatar}