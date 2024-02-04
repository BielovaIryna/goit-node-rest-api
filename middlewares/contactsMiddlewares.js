import { Types } from "mongoose";
import HttpError from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrraper.js";
import { Contacts } from "../models/contactsModel.js";
import validateBody from "../helpers/validateBody.js";


export const checkContactId = ctrlWrapper (async (req, res, next) =>{
    const {id} = req.params;
    const isIdValid = Types.ObjectId.isValid(id);
    if(!isIdValid){
        throw HttpError (404, 'User not found')
    }
    const isContactExist = await Contacts.exists({_id:id});
    if (!isContactExist) {
        throw HttpError (404, 'User not found')
    }
    next()
})