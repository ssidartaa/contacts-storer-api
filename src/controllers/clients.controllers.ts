import { Request, Response } from "express";

import { instanceToPlain } from "class-transformer";

import {
  createClientService,
  listClientsService,
  retrieveClientService,
  retrievePDFClientService,
  updateClientService,
  deleteClientService,
} from "../services/clients.services";

import { IClientRequest, IUpdateClientRequest } from "../interfaces";

export const createClientController = async (req: Request, res: Response) => {
  const client: IClientRequest = req.body;

  const newClient = await createClientService(client);

  return res.status(201).json(instanceToPlain(newClient));
};

export const listClientsController = async (_: Request, res: Response) => {
  const clients = await listClientsService();

  return res.json(instanceToPlain(clients));
};

export const retrieveClientController = async (req: Request, res: Response) => {
  const { id } = req.client;

  const ownerClient = await retrieveClientService(id);

  return res.json(instanceToPlain(ownerClient));
};

export const retrievePDFClientController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.client;
  res.setHeader("Content-Disposition", 'inline; filename="client.pdf"');
  res.setHeader("Content-type", "application/pdf");

  const newPDF = await retrievePDFClientService(id);

  newPDF.pipe(res.status(201));
};

export const updateClientController = async (req: Request, res: Response) => {
  const client: IUpdateClientRequest = req.body;
  const { id } = req.client;

  const updatedClient = await updateClientService(client, id);

  return res.json(instanceToPlain(updatedClient));
};

export const deleteClientController = async (req: Request, res: Response) => {
  const { id } = req.client;

  const status = await deleteClientService(id);

  return res.status(status).send();
};
