import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.string().min(10).required(),
    favorite: Joi.boolean().required()

})

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone: Joi.string().min(10),
    favorite: Joi.boolean()
}).min(1).message ("Body must have at least one field")

export const updateContactFavoriveSchema = Joi.object({
        favorite: Joi.boolean().required()
})