import Contact from "../entities/contacts.entity";

import {
  clientRepository,
  contactRepository,
} from "../utils/getRepositories.utils";

import {
  IContactRequest,
  IContactWithOnwerId,
  IUpdateContactRequest,
} from "../interfaces";

export const createContactService = async (
  { fullName, email, phoneNumber }: IContactRequest,
  id: string
): Promise<Contact> => {
  const client = await clientRepository.findOneBy({ id });

  const newContact = await contactRepository.save({
    fullName,
    email,
    phoneNumber,
    client: client!,
  });

  return { ...newContact, client: undefined as any };
};

export const listOwnerContactsService = async (
  id: string
): Promise<Contact[]> => {
  const ownerContacts = await contactRepository.find({
    relations: { client: true },
  });

  return ownerContacts
    .filter((contact) => contact.client.id === id)
    .map((contact) => {
      return { ...contact, client: undefined as any };
    });
};

export const listContactByIdService = async (
  id: string,
  clientId: string
): Promise<IContactWithOnwerId> => {
  const contact = await contactRepository.findOne({
    where: { id },
  });

  return { ...contact!, ownerId: clientId }!;
};

export const updateContactService = async (
  { fullName, email, phoneNumber }: IUpdateContactRequest,
  id: string
): Promise<Contact> => {
  const contact = await contactRepository.findOneBy({
    id,
  });

  await contactRepository.update(id, {
    fullName: fullName ? fullName : contact!.fullName,
    email: email ? email : contact!.email,
    phoneNumber: phoneNumber ? phoneNumber : contact!.phoneNumber,
  });

  const updatedContact = await contactRepository.findOneBy({
    id,
  });

  return updatedContact!;
};

export const deleteContactService = async (id: string): Promise<number> => {
  await contactRepository.delete(id);

  return 204;
};
