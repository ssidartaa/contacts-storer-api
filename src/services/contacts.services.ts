import Contact from "../entities/contacts.entity";

import {
  clientRepository,
  contactRepository,
} from "../utils/getRepositories.utils";

import { IContactRequest, IUpdateContactRequest } from "../interfaces";

import {
  createContactSerializer,
  updateContactSerializer,
} from "../serializers/contacts.serializers";

export const createContactService = async (
  { fullName, email, phoneNumber }: IContactRequest,
  id: string
): Promise<Contact> => {
  await createContactSerializer.validate(
    { fullName, email, phoneNumber },
    { abortEarly: false, stripUnknown: true }
  );

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

export const updateContactService = async (
  { fullName, email, phoneNumber }: IUpdateContactRequest,
  id: string
): Promise<Contact> => {
  await updateContactSerializer.validate(
    { fullName, email, phoneNumber },
    { abortEarly: false, stripUnknown: true }
  );

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
