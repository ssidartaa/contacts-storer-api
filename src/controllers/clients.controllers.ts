import { Request, Response } from "express";

import { instanceToPlain } from "class-transformer";

import {
  createClientService,
  listClientsService,
  updateClientService,
  deleteClientService,
} from "../services/clients.services";

export const createClientController = async (req: Request, res: Response) => {
  const client: IClientRequest = req.body;

  const [newClient, status] = await createClientService(client);

  return res.status(status).json(instanceToPlain(newClient));
};

export const listClientsController = async (_: Request, res: Response) => {
  const [clients, status] = await listClientsService();

  return res.status(status).json(instanceToPlain(clients));
};

export const updateClientController = async (req: Request, res: Response) => {
  const client: IUpdateClientRequest = req.body;
  const { id } = req.params;

  const [updatedClient, status] = await updateClientService(client, id);

  return res.status(status).json(instanceToPlain(updatedClient));
};

export const DeleteClientController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const status = await deleteClientService(id);

  return res.status(status).send();
};
