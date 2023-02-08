import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";

import {
  mockedClient,
  mockedClientLogin,
  mockedContact,
  mockedUpdateClient,
} from "../../mocks";

describe("/clients", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /clients : error - Should not be able to create a client without body", async () => {
    const { body, status } = await request(app).post("/clients");

    expect(body).toHaveProperty("message");
    expect(status).toBe(400);
  });

  test("POST /clients : success - Must be able to create a client", async () => {
    const { body, status } = await request(app)
      .post("/clients")
      .send(mockedClient);

    expect(body).toHaveProperty("id");
    expect(body).toHaveProperty("fullName");
    expect(body).toHaveProperty("email");
    expect(body).toHaveProperty("phoneNumber");
    expect(body).toHaveProperty("createdAt");
    expect(body).toHaveProperty("updatedAt");
    expect(body).not.toHaveProperty("password");
    expect(body.fullName).toEqual("Sidarta Kauã Oliveira Souza");
    expect(body.email).toEqual("sid@mail.com");
    expect(body.phoneNumber).toEqual("+55 (68) 99609-0471");
    expect(body.contacts).toHaveLength(0);
    expect(status).toBe(201);
  });

  test("POST /clients : error - Should not be able to create a client that already exists", async () => {
    const { body, status } = await request(app)
      .post("/clients")
      .send(mockedClient);

    expect(body).toHaveProperty("message");
    expect(status).toBe(400);
  });

  test("GET /clients : success - Must be able to list clients", async () => {
    const { body, status } = await request(app).get("/clients");

    expect(body).toHaveLength(1);
    expect(status).toBe(200);
  });

  test("GET /clients/owner : error - Should not be able to list own client without authentication", async () => {
    const { body, status } = await request(app).get("/clients/owner");

    expect(body).toHaveProperty("message");
    expect(status).toBe(401);
  });

  test("GET /clients/owner : success - Must be able to list own client and show client contacts before create contact", async () => {
    const { body: loginBody } = await request(app)
      .post("/login")
      .send(mockedClientLogin);

    const { body, status } = await request(app)
      .get("/clients/owner")
      .set("Authorization", `Bearer ${loginBody.token}`);

    expect(body).toHaveProperty("id");
    expect(body).toHaveProperty("fullName");
    expect(body).toHaveProperty("email");
    expect(body).toHaveProperty("phoneNumber");
    expect(body).toHaveProperty("createdAt");
    expect(body).toHaveProperty("updatedAt");
    expect(body).toHaveProperty("contacts");
    expect(body).not.toHaveProperty("password");
    expect(body.fullName).toEqual("Sidarta Kauã Oliveira Souza");
    expect(body.email).toEqual("sid@mail.com");
    expect(body.phoneNumber).toEqual("+55 (68) 99609-0471");
    expect(body.contacts).toHaveLength(0);
    expect(status).toBe(200);
  });

  test("GET /clients/owner : success - Must be able to list own client and show client contacts after create contact", async () => {
    const { body: loginBody } = await request(app)
      .post("/login")
      .send(mockedClientLogin);

    await request(app)
      .post("/contacts")
      .send(mockedContact)
      .set("Authorization", `Bearer ${loginBody.token}`);

    const { body, status } = await request(app)
      .get("/clients/owner")
      .set("Authorization", `Bearer ${loginBody.token}`);

    expect(body).toHaveProperty("id");
    expect(body).toHaveProperty("fullName");
    expect(body).toHaveProperty("email");
    expect(body).toHaveProperty("phoneNumber");
    expect(body).toHaveProperty("createdAt");
    expect(body).toHaveProperty("updatedAt");
    expect(body).toHaveProperty("contacts");
    expect(body).not.toHaveProperty("password");
    expect(body.fullName).toEqual("Sidarta Kauã Oliveira Souza");
    expect(body.email).toEqual("sid@mail.com");
    expect(body.phoneNumber).toEqual("+55 (68) 99609-0471");
    expect(body.contacts).toHaveLength(1);
    expect(status).toBe(200);
  });

  test("GET /clients/owner : success - Must be able to list own client and show client contacts after delete contact", async () => {
    const { body: loginBody } = await request(app)
      .post("/login")
      .send(mockedClientLogin);

    const { body: getBody } = await request(app)
      .get("/contacts")
      .send(mockedContact)
      .set("Authorization", `Bearer ${loginBody.token}`);

    await request(app)
      .delete(`/contacts/${getBody[0].id}`)
      .send(mockedContact)
      .set("Authorization", `Bearer ${loginBody.token}`);

    const { body, status } = await request(app)
      .get("/clients/owner")
      .set("Authorization", `Bearer ${loginBody.token}`);

    expect(body).toHaveProperty("id");
    expect(body).toHaveProperty("fullName");
    expect(body).toHaveProperty("email");
    expect(body).toHaveProperty("phoneNumber");
    expect(body).toHaveProperty("createdAt");
    expect(body).toHaveProperty("updatedAt");
    expect(body).toHaveProperty("contacts");
    expect(body).not.toHaveProperty("password");
    expect(body.fullName).toEqual("Sidarta Kauã Oliveira Souza");
    expect(body.email).toEqual("sid@mail.com");
    expect(body.phoneNumber).toEqual("+55 (68) 99609-0471");
    expect(body.contacts).toHaveLength(0);
    expect(status).toBe(200);
  });

  test("POST /clients/pdf : error - Should not be able to create own client PDF without authentication", async () => {
    const { body, status } = await request(app).post("/clients/pdf");

    expect(body).toHaveProperty("message");
    expect(status).toBe(401);
  });

  test("POST /clients/pdf : success - Must be able to create own client PDF", async () => {
    const { body: loginBody } = await request(app)
      .post("/login")
      .send(mockedClientLogin);

    const { body, status } = await request(app)
      .post("/clients/pdf")
      .set("Authorization", `Bearer ${loginBody.token}`);

    expect(typeof body).toEqual("object");
    expect(status).toBe(201);
  });

  test("PATCH /clients : error - Should not be able to update own client without authentication", async () => {
    const { body, status } = await request(app).patch("/clients");

    expect(body).toHaveProperty("message");
    expect(status).toBe(401);
  });

  test("PATCH /clients : success - Must be able to update own client", async () => {
    const { body: loginBody } = await request(app)
      .post("/login")
      .send(mockedClientLogin);

    const { body, status } = await request(app)
      .patch("/clients")
      .send(mockedUpdateClient)
      .set("Authorization", `Bearer ${loginBody.token}`);

    expect(body).toHaveProperty("id");
    expect(body).toHaveProperty("fullName");
    expect(body).toHaveProperty("email");
    expect(body).toHaveProperty("phoneNumber");
    expect(body).toHaveProperty("createdAt");
    expect(body).toHaveProperty("updatedAt");
    expect(body).toHaveProperty("contacts");
    expect(body).not.toHaveProperty("password");
    expect(body.fullName).toEqual("Andrey Oliveira Souza");
    expect(body.email).toEqual("sid@mail.com");
    expect(body.phoneNumber).toEqual("+55 (68) 99609-0471");
    expect(body.contacts).toHaveLength(0);
    expect(status).toBe(200);
  });

  test("DELETE /clients : error - Should not be able to delete own client without authentication", async () => {
    const { body, status } = await request(app).delete("/clients");

    expect(body).toHaveProperty("message");
    expect(status).toBe(401);
  });

  test("DELETE /clients : success - Must be able to delete own client", async () => {
    const { body: loginBody } = await request(app)
      .post("/login")
      .send(mockedClientLogin);

    const { status } = await request(app)
      .delete("/clients")
      .set("Authorization", `Bearer ${loginBody.token}`);

    const { body } = await request(app).get("/clients");

    expect(body).toHaveLength(0);
    expect(status).toBe(204);
  });
});
