import { addContact, getContactById, listContact, removeContact, updatedContact, updatedContactFavorite} from "../services/contactsServices.js";
import { ctrlWrapper } from "../helpers/ctrlWrraper.js";
import HttpError from "../helpers/HttpError.js";





export const getAllContacts = ctrlWrapper(async(req, res) => {
const allContacts = await listContact();
res.json(allContacts)
});

export const getOneContact = ctrlWrapper(async(req, res) => {
    const {id} = req.params;

    const contact = await getContactById (id);
    
    res.json(contact)
});

export const deleteContact = ctrlWrapper(async(req, res) => {
    const {id} = req.params;

    const delContact = await removeContact (id);
    
    res.json(delContact) 
});

export const createContact =ctrlWrapper(async (req, res) => {
    const newContact = await addContact(req.body)
    res.status(201).json(newContact)
});

export const updateContact = ctrlWrapper(async (req, res) => {
    const {id} = req.params;
    
const updContact = await updatedContact(id, req.body);
if (!updContact){
    throw HttpError (404, "Not found")
}
res.json(updContact)
});
export const updateContactFavorive =await ctrlWrapper (async (req, res)=>{
    const {id} = req.params;
    const updContact = await updatedContactFavorite(id, req.body);
    if (!updContact){
        throw HttpError (404, "Not found")
    }
    res.json(updContact)
})
