import { hashSync } from "bcryptjs";

import AppError from "../errors/appError";

import Client from "../entities/clients.entity";

import { clientRepository } from "../utils/getRepositories.utils";

import { IClientRequest, IUpdateClientRequest } from "../interfaces";

import formatDateAndHour from "../utils/formatDateAndHour";

import {
  createClientSerializer,
  updateClientSerializer,
} from "../serializers/clients.serializers";

export const createClientService = async ({
  fullName,
  email,
  password,
  phoneNumber,
}: IClientRequest): Promise<Client> => {
  await createClientSerializer.validate(
    { fullName, email, password, phoneNumber },
    { abortEarly: false, stripUnknown: true }
  );

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

export const retrievePDFClientService = async (id: string): Promise<any> => {
  const client = await clientRepository.findOne({
    where: { id },
    relations: { contacts: true },
  });

  client!.createdAt = formatDateAndHour(client!.createdAt) as any;
  client!.updatedAt = formatDateAndHour(client!.updatedAt) as any;

  client!.contacts.map((contact) => {
    contact.createdAt = formatDateAndHour(contact.createdAt) as any;
    contact.updatedAt = formatDateAndHour(contact.updatedAt) as any;
  });

  const PDFDocument = require("pdfkit");
  const PDFTable = require("voilab-pdf-table");

  const PDF = new PDFDocument();
  const table = new PDFTable(PDF);

  PDF.font("Times-Bold").text(
    `Dados do Cliente ${client!.fullName.split(" ")[0]}:`,
    { align: "center" },
    20
  );

  PDF.text(`Nome Completo:`, 70, 50)
    .font("Times-Roman")
    .text(client!.fullName, 160, 50);

  PDF.font("Times-Bold")
    .text(`Email:`, 70, 70)
    .font("Times-Roman")
    .text(client!.email, 108, 70);

  PDF.font("Times-Bold")
    .text(`Número telefônico:`, 70, 90)
    .font("Times-Roman")
    .text(client!.phoneNumber, 170, 90);

  PDF.font("Times-Bold")
    .text(`Criado em:`, 70, 110)
    .font("Times-Roman")
    .text(client!.createdAt, 132, 110);

  PDF.font("Times-Bold")
    .text(`Atualizado em:`, 70, 130)
    .font("Times-Roman")
    .text(client!.updatedAt, 152, 130);

  PDF.font("Times-Bold").text(`Contatos do Cliente:`, 70, 180);

  PDF.font("Times-Roman");

  PDF.fontSize(10);
  table
    .addPlugin(
      new (require("voilab-pdf-table/plugins/fitcolumn"))({
        column: "fullName",
      })
    )
    .setColumnsDefaults({
      headerBorder: "B",
      align: "right",
    })
    .addColumns([
      {
        id: "fullName",
        header: "Nome Completo",
        align: "left",
      },
      {
        id: "email",
        header: "Email",
        width: 100,
        align: "left",
      },
      {
        id: "phoneNumber",
        header: "Número telefônico",
        width: 100,
        align: "left",
      },
      {
        id: "createdAt",
        header: "Adicionado em",
        width: 90,
        align: "left",
      },
      {
        id: "updatedAt",
        header: "Atualizado em",
        width: 80,
        align: "left",
      },
    ])
    .onPageAdded(function (tb: any) {
      tb.addHeader();
    });

  table.addBody(client!.contacts);

  PDF.end();

  return PDF;
};

export const updateClientService = async (
  { fullName, email, password, phoneNumber }: IUpdateClientRequest,
  id: string
): Promise<Client> => {
  await updateClientSerializer.validate(
    { fullName, email, password, phoneNumber },
    { abortEarly: false, stripUnknown: true }
  );

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
