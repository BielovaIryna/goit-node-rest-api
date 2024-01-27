import fs from 'fs/promises';
import { nanoid } from 'nanoid';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contactsPath = path.join(__dirname, "../db/contacts.json");
 

export const listContact= async () =>{
    const data = await fs.readFile(contactsPath)
    return JSON.parse(data)
  }
  
  export const getContactById= async (contactId)=> {
    const contacts = await listContact();
    const contact = contacts.find(contact => contact.id===contactId);
    return contact || null
  }
  
  export const removeContact= async (contactId) => {
    const contacts = await listContact();
    const index = contacts.findIndex(contact => contact.id ===contactId);
   if (index === -1){
    return null
   }
   const [contact] = contacts.splice(index, 1);
   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
   return contact
    // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  }
  
  export const addContact = async (data) => {
    const newContact ={
      id: nanoid(),
      ...data
    }
    const contacts = await listContact();
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return newContact
    // ...твій код. Повертає об'єкт доданого контакту (з id).
  }

  export const updatedContact = async (contactId, data) =>{
    const contacts = await listContact();
    const index = contacts.findIndex(contact => contact.id ===contactId);
   if (index === -1){
    return null
   }
   const renewContact = {...contacts[index], ...data}
   contacts.splice(index, 1, renewContact);
   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
   return renewContact
  }






