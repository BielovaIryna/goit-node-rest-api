import { addContact, getContactById, listContact, removeContact, updatedContact, updatedContactFavorite} from "../services/contactsServices.js";
import { ctrlWrapper } from "../helpers/ctrlWrraper.js";
import HttpError from "../helpers/HttpError.js";





export const getAllContacts = ctrlWrapper(async(req, res) => {
const contacts = await listContact();
res.json(contacts)
});

export const getOneContact = ctrlWrapper(async(req, res) => {
    const {id} = req.params;

    const contact = await getContactById (id);
    
    res.json(contact)
});

export const deleteContact = ctrlWrapper(async(req, res) => {
    const {id} = req.params;

    const contact = await removeContact (id);
    
    res.json(contact) 
});

export const createContact =ctrlWrapper(async (req, res) => {
    const contact = await addContact(req.body)
    res.status(201).json(contact)
});

export const updateContact = ctrlWrapper(async (req, res) => {
    const {id} = req.params;
    
const contact = await updatedContact(id, req.body);
if (!contact){
    throw HttpError (404, "Not found")
}
res.json(contact)
});
export const updateContactFavorive =await ctrlWrapper (async (req, res)=>{
    const {id} = req.params;
    const contact = await updatedContactFavorite(id, req.body);
    if (!contact){
        throw HttpError (404, "Not found")
    }
    res.json(contact)
})
