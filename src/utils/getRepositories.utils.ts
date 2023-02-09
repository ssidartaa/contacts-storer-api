import AppDataSource from "../data-source";

import Client from "../entities/clients.entity";

import Contact from "../entities/contacts.entity";

export const clientRepository = AppDataSource.getRepository(Client);

export const contactRepository = AppDataSource.getRepository(Contact);
