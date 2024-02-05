import { Contacts } from "../models/contactsModel.js";



export const listContact= () => Contacts.find();
  
  export const getContactById= (contactId)=> Contacts.findById (contactId);
    
  
  export const removeContact= async (contactId) => Contacts.findByIdAndDelete(contactId);
   
  export const addContact = async (data) => Contacts.create(data);
    

  export const updatedContact = async (contactId, data) =>{
    const contact = await Contacts.findByIdAndUpdate(contactId, data, {new: true} )
    
    return contact
   }
   
  export const updatedContactFavorite = async (contactId, data) =>{
    const contact = await Contacts.findById(contactId);
    Object.keys(data).forEach((key) =>{
      contact[key] = data[key]
    })
    return contact.save()
  }






