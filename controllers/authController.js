import { ctrlWrapper } from "../helpers/ctrlWrraper.js";
import { userLogin, userRegister } from "../services/usersServices.js";

const register = ctrlWrapper(async(req, res)=>{
    const {user, token} = await userRegister(req.body);
    res.status(201).json({
       user
});

const login = ctrlWrapper (async(req, res) =>{
    
    const {token, user} = await userLogin(req.body);
   

    res.status(200).json({
        token,
        user
    });
})

const logout = ctrlWrapper(async(req, res)=>{
    await User.findByIdAndUpdate(req.user.id, { token: " " });

    res.status(204).send("Logout success");

})
const current =async(req, res)=>{
    const { email, subscription } = req.user;
    res.status(200).json({ email, subscription });
}

const updateAvatar = ctrlWrapper(async(req, res)=>{
    const updatedUser = await updateUserAvatar (req.body, req.user, req.file)

    res.status(200).json(user.avatarURL)
})
export {register, login, logout, current, updateAvatar}