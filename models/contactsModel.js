import { Schema, model } from "mongoose";
const contactsSchema = new Schema (
    {
        name: {
          type: String,
          required: [true, 'Set name for contact'],
        },
        email: {
          type: String,
        },
        phone: {
          type: String,
        },
        favorite: {
          type: Boolean,
          default: false,
        },
      },
      {
        versionKey: false
      }
)
const Contacts= model('Contact', contactsSchema);
export{Contacts}