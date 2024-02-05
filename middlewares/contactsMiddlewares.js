import { Types } from "mongoose";
import HttpError from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrraper.js";
import { Contacts } from "../models/contactsModel.js";



export const checkContactId = ctrlWrapper (async (req, res, next) =>{
    const {id} = req.params;
    const isIdValid = Types.ObjectId.isValid(id);
    if(!isIdValid){
        throw HttpError (404, 'Contact not found')
    }
    const isContactExist = await Contacts.exists({_id:id});
    if (!isContactExist) {
        throw HttpError (404, 'Contact not found')
    }
    next()
})
export const checkContactIdFavorite = ctrlWrapper (async (req, res, next) =>{
    const {id} = req.params;
    const isIdValid = Types.ObjectId.isValid(id);
    if(!isIdValid){
        throw HttpError (404, 'Contact not found')
    }
    const isContactExist = await Contacts.exists({_id:id});
    if (!isContactExist) {
        throw HttpError (404, 'Cannot set properties of null (setting "favorite")')
    }
    next()
})