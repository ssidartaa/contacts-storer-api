import {
  IClientRequest,
  IContactRequest,
  ILoginRequest,
  IUpdateClientRequest,
  IUpdateContactRequest,
} from "../../interfaces";

export const mockedClient: IClientRequest = {
  fullName: "Sidarta Kauã Oliveira Souza",
  email: "sid@mail.com",
  password: "1234",
  phoneNumber: "+55 (68) 99609-0471",
};

export const mockedContact: IContactRequest = {
  fullName: "Kenzinho Oliveira Santos",
  email: "kenzinho@mail.com",
  phoneNumber: "+12 (123) 12345-6789",
};

export const mockedClientLogin: ILoginRequest = {
  email: "sid@mail.com",
  password: "1234",
};

export const mockedInvalidLogin: ILoginRequest = {
  email: "drey@gmail.com",
  password: "123test",
};

export const mockedUpdateClient: IUpdateClientRequest = {
  fullName: "Andrey Oliveira Souza",
};

export const mockedUpdateContact: IUpdateContactRequest = {
  fullName: "Drey Oliveira Souza",
};

export const mockedValidUuid: string = "08fc6ccd-096d-4582-9ce3-ac45d07a20ea";

export const mockedInvalidUuid: string = "7";
