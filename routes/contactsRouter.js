import {Router} from "express";
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
import { checkContactId} from "../middlewares/contactsMiddlewares.js";
import { auth } from "../middlewares/authMiddleware.js";

const contactsRouter = Router();
contactsRouter.use(auth)
contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", checkContactId, getOneContact);

contactsRouter.delete("/:id", checkContactId, deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", checkContactId, validateBody(updateContactSchema), updateContact);
contactsRouter.patch("/:id/favorite",checkContactId, validateBody(updateContactFavoriveSchema), updateContactFavorive);

export default contactsRouter;
