import { addContact, getContactById, listContact, removeContact, updatedContact, updatedContactFavorite} from "../services/contactsServices.js";
import { ctrlWrapper } from "../helpers/ctrlWrraper.js";
import HttpError from "../helpers/HttpError.js";





export const getAllContacts = ctrlWrapper(async(req, res) => {
const contacts = await listContact(req.user.id);

res.json(contacts)
});

export const getOneContact = ctrlWrapper(async(req, res) => {
    const {id} = req.params;
   
    const userId = req.user.id;
    
    const contact = await getContactById(id, userId);
    console.log(contact);
 

  if (contact.owner.toString() !== userId) {
    throw HttpError(404, "Contact Not Found");
  }
   
    
    res.json(contact)
});

export const deleteContact = ctrlWrapper(async(req, res) => {
    const {id} = req.params;
    const userId = req.user.id;
    const contact = await removeContact (id, userId);
    if (contact.owner.toString() !== userId) {
        throw HttpError(404, "Contact Not Found");
      }
    res.json(contact) 
});

export const createContact =ctrlWrapper(async (req, res) => {
    const contact = await addContact(req.body, req.user)
    res.status(201).json(contact)
});

export const updateContact = ctrlWrapper(async (req, res) => {
    const {id} = req.params;
    const userId = req.user.id;
const contact = await updatedContact(id,userId, req.body);
if (!contact){
    throw HttpError (404, "Not found")
}
if (contact.owner.toString() !== userId) {
    throw HttpError(404, "Contact Not Found");
  }
res.json(contact)
});
export const updateContactFavorive =await ctrlWrapper (async (req, res)=>{
    const {id} = req.params;
    const userId = req.user.id;
    const contact = await updatedContactFavorite(id, userId, req.body);
    if (!contact){
        throw HttpError (404, "Not found")
    }
    res.json(contact)
})
