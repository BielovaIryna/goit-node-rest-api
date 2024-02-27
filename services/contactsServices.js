import { Contacts } from "../models/contactsModel.js";



export const listContact= (userId) =>{

  return Contacts.find({owner:userId});
} 

  
  export const getContactById= async (contactId, userId) => {
    const contact = await Contacts.findOne({ _id: contactId, owner: userId });
    return contact
    };
    
  
  export const removeContact= async (contactId, userId) =>{
   const contact= Contacts.findOneAndDelete({_id:contactId, owner:userId});
return contact
  } 
   
  export const addContact = async (data, owner) =>{
   
    return Contacts.create({...data, owner});
  } 
    

  export const updatedContact = async (contactId, userId, data) =>{
    const contact = await Contacts.findOneAndUpdate({_id:contactId, owner:userId}, data, {new: true} )
    
    return contact
   }
   
  export const updatedContactFavorite = async (contactId, userId, data) =>{
    const contact = await Contacts.findOne({_id: contactId, owner: userId});
    Object.keys(data).forEach((key) =>{
      contact[key] = data[key]
    })
    return contact.save()
  }






