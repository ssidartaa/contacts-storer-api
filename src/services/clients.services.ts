import { hashSync } from "bcryptjs";

import AppError from "../errors/appError";

import Client from "../entities/clients.entity";

import { clientRepository } from "../utils/getRepositories.utils";

import { IClientRequest, IUpdateClientRequest } from "../interfaces";

export const createClientService = async ({
  fullName,
  email,
  password,
  phoneNumber,
}: IClientRequest): Promise<Client> => {
  const client = await clientRepository.findOneBy({
    email,
  });

  if (client) throw new AppError(`Client with email: ${email} already exists`);

  const hashedPassword = hashSync(password, 10);

  const newClient = await clientRepository.save({
    fullName,
    email,
    password: hashedPassword,
    phoneNumber,
  });

  return { ...newClient, password: undefined as any };
};

export const listClientsService = async (): Promise<Client[]> => {
  const clients = await clientRepository.find({
    relations: { contacts: true },
  });

  return clients;
};

export const retrieveClientService = async (id: string): Promise<Client> => {
  const client = await clientRepository.findOne({
    where: { id },
    relations: { contacts: true },
  });

  return client!;
};

export const updateClientService = async (
  { fullName, email, password, phoneNumber }: IUpdateClientRequest,
  id: string
): Promise<Client> => {
  const client = await clientRepository.findOneBy({
    id,
  });

  await clientRepository.update(id, {
    fullName: fullName ? fullName : client!.fullName,
    email: email ? email : client!.email,
    password: password ? hashSync(password, 10) : client!.password,
    phoneNumber: phoneNumber ? phoneNumber : client!.phoneNumber,
  });

  const updatedClient = await clientRepository.findOne({
    where: { id },
    relations: { contacts: true },
  });

  return updatedClient!;
};

export const deleteClientService = async (id: string): Promise<number> => {
  await clientRepository.delete(id);

  return 204;
};
