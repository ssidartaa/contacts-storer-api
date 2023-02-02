import { Request, Response } from "express";

import { instanceToPlain } from "class-transformer";

import {
  createClientService,
  listClientsService,
  retrieveClientService,
  updateClientService,
  deleteClientService,
} from "../services/clients.services";

export const createClientController = async (req: Request, res: Response) => {
  const client: IClientRequest = req.body;

  const newClient = await createClientService(client);

  return res.status(201).json(instanceToPlain(newClient));
};

export const listClientsController = async (_: Request, res: Response) => {
  const clients = await listClientsService();

  return res.status(200).json(instanceToPlain(clients));
};

export const retrieveClientsController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.client;

  const ownerClient = await retrieveClientService(id);

  return res.status(200).json(instanceToPlain(ownerClient));
};

export const updateClientController = async (req: Request, res: Response) => {
  const client: IUpdateClientRequest = req.body;
  const { id } = req.params;

  const updatedClient = await updateClientService(client, id);

  return res.status(200).json(instanceToPlain(updatedClient));
};

export const DeleteClientController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const status = await deleteClientService(id);

  return res.status(status).send();
};
