import { Schema, model } from "mongoose";
import crypto from 'crypto';
import gravatar from 'gravatar'

const usersSchema = new Schema (
    {
        password: {
          type: String,
          required: [true, 'Password is required'],
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
        },
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter"
        },
        token: {
          type: String,
          default: null,
        },
                 
          avatarURL: {
            type: String},
          
           
        
      },
      {
        versionKey: false
      }
)
usersSchema.pre('save', async function (next){
  if (this.isNew){
    const emailHash = crypto.createHash('md5').update(this.email).digest('hex');
    this.avatarURL=gravatar.url(emailHash, {s: '100', r: 'x', d: 'monsterid'})
  }
  next()
})
const Users = model ('user', usersSchema);
export {Users}