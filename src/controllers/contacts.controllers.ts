import { Request, Response } from "express";

import {
  createContactService,
  listOwnerContactsService,
  updateContactService,
  deleteContactService,
} from "../services/contacts.services";

import { IContactRequest, IUpdateContactRequest } from "../interfaces";

export const createContactController = async (req: Request, res: Response) => {
  const contact: IContactRequest = req.body;
  const { id } = req.client;

  const newContact = await createContactService(contact, id);

  return res.status(201).json(newContact);
};

export const listOwnerContactsController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.client;

  const ownerContacts = await listOwnerContactsService(id);

  return res.status(200).json(ownerContacts);
};

export const updateContactController = async (req: Request, res: Response) => {
  const contact: IUpdateContactRequest = req.body;
  const { id } = req.params;

  const updatedContact = await updateContactService(contact, id);

  return res.status(200).json(updatedContact);
};

export const deleteContactController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const status = await deleteContactService(id);

  return res.status(status).send();
};
