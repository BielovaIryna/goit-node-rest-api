import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateContactFavorive
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import { createContactSchema, updateContactFavoriveSchema, updateContactSchema } from "../schemas/contactsSchemas.js";
import { checkContactId } from "../middlewares/contactsMiddlewares.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", checkContactId, getOneContact);

contactsRouter.delete("/:id", checkContactId, deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", validateBody(updateContactSchema), updateContact);
contactsRouter.patch("/:id", validateBody(updateContactFavoriveSchema), updateContactFavorive);

export default contactsRouter;
