import { Request, Response } from "express";

import {
  createContactService,
  listOwnerContactsService,
  listContactByIdService,
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

  return res.json(ownerContacts);
};
export const listContactByIdController = async (
  req: Request,
  res: Response
) => {
  const { id: clientId } = req.client;
  const { id } = req.params;

  const contact = await listContactByIdService(id, clientId);

  return res.json(contact);
};

export const updateContactController = async (req: Request, res: Response) => {
  const contact: IUpdateContactRequest = req.body;
  const { id } = req.params;

  const updatedContact = await updateContactService(contact, id);

  return res.json(updatedContact);
};

export const deleteContactController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const status = await deleteContactService(id);

  return res.status(status).send();
};
