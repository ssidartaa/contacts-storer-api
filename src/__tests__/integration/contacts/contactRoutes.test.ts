import { DataSource } from "typeorm";
import app from "../../../app";
import request from "supertest";
import AppDataSource from "../../../data-source";

import {
  mockedClient,
  mockedClientLogin,
  mockedContact,
  mockedInvalidUuid,
  mockedUpdateContact,
  mockedValidUuid,
} from "../../mocks";

describe("/contacts", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/clients").send(mockedClient);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /contacts : error - Should not be able to create contact for client without authentication", async () => {
    const { body, status } = await request(app).get("/contacts");

    expect(body).toHaveProperty("message");
    expect(status).toBe(401);
  });

  test("POST /contacts : error - Should not be able to create a contact for client without body", async () => {
    const { body: loginBody } = await request(app)
      .post("/login")
      .send(mockedClientLogin);

    const { body, status } = await request(app)
      .post("/contacts")
      .set("Authorization", `Bearer ${loginBody.token}`);

    expect(body).toHaveProperty("message");
    expect(status).toBe(400);
  });

  test("POST /contacts : success - Must be able to create a contact for client", async () => {
    const { body: loginBody } = await request(app)
      .post("/login")
      .send(mockedClientLogin);

    const { body, status } = await request(app)
      .post("/contacts")
      .send(mockedContact)
      .set("Authorization", `Bearer ${loginBody.token}`);

    expect(body).toHaveProperty("id");
    expect(body).toHaveProperty("fullName");
    expect(body).toHaveProperty("email");
    expect(body).toHaveProperty("phoneNumber");
    expect(body).toHaveProperty("createdAt");
    expect(body).toHaveProperty("updatedAt");
    expect(body.fullName).toEqual("Kenzinho Oliveira Santos");
    expect(body.email).toEqual("kenzinho@mail.com");
    expect(body.phoneNumber).toEqual("+12 (123) 12345-6789");
    expect(status).toBe(201);
  });

  test("GET /contacts : error - Should not be able to list client contacts without authentication", async () => {
    const { body, status } = await request(app).get("/contacts");

    expect(body).toHaveProperty("message");
    expect(status).toBe(401);
  });

  test("GET /contacts : success - Must be able to list a client contacts", async () => {
    const { body: loginBody } = await request(app)
      .post("/login")
      .send(mockedClientLogin);

    const { body, status } = await request(app)
      .get("/contacts")
      .set("Authorization", `Bearer ${loginBody.token}`);

    expect(body).toHaveLength(1);
    expect(status).toBe(200);
  });

  test("PATCH /contacts/:id : error - Should not be able to update a client contact without authentication", async () => {
    const { body, status } = await request(app).patch(
      `/contacts/${mockedValidUuid}`
    );

    expect(body).toHaveProperty("message");
    expect(status).toBe(401);
  });

  test("PATCH /contacts/:id : error - Should not be able to update a client contact with invalid uuid", async () => {
    const { body: loginBody } = await request(app)
      .post("/login")
      .send(mockedClientLogin);

    const { body, status } = await request(app)
      .patch(`/contacts/${mockedInvalidUuid}`)
      .set("Authorization", `Bearer ${loginBody.token}`);

    expect(body).toHaveProperty("message");
    expect(status).toBe(400);
  });

  test("PATCH /contacts/:id : error - Should not be able to update a client contact with invalid contact", async () => {
    const { body: loginBody } = await request(app)
      .post("/login")
      .send(mockedClientLogin);

    const { body, status } = await request(app)
      .patch(`/contacts/${mockedValidUuid}`)
      .set("Authorization", `Bearer ${loginBody.token}`);

    expect(body).toHaveProperty("message");
    expect(status).toBe(404);
  });

  test("PATCH /contacts/:id : success - Must be able to update a client contact", async () => {
    const { body: loginBody } = await request(app)
      .post("/login")
      .send(mockedClientLogin);

    const { body: getBody } = await request(app)
      .get("/contacts")
      .set("Authorization", `Bearer ${loginBody.token}`);

    const { body, status } = await request(app)
      .patch(`/contacts/${getBody[0].id}`)
      .send(mockedUpdateContact)
      .set("Authorization", `Bearer ${loginBody.token}`);

    expect(body).toHaveProperty("id");
    expect(body).toHaveProperty("fullName");
    expect(body).toHaveProperty("email");
    expect(body).toHaveProperty("phoneNumber");
    expect(body).toHaveProperty("createdAt");
    expect(body).toHaveProperty("updatedAt");
    expect(body.fullName).toEqual("Drey Oliveira Souza");
    expect(body.email).toEqual("kenzinho@mail.com");
    expect(body.phoneNumber).toEqual("+12 (123) 12345-6789");
    expect(status).toBe(200);
  });

  test("DELETE /contacts/:id : error - Should not be able to delete a client contact without authentication", async () => {
    const { body, status } = await request(app).delete(
      `/contacts/${mockedValidUuid}`
    );

    expect(body).toHaveProperty("message");
    expect(status).toBe(401);
  });

  test("DELETE /contacts/:id : error - Should not be able to delete a client contact with invalid uuid", async () => {
    const { body: loginBody } = await request(app)
      .post("/login")
      .send(mockedClientLogin);

    const { body, status } = await request(app)
      .delete(`/contacts/${mockedInvalidUuid}`)
      .set("Authorization", `Bearer ${loginBody.token}`);

    expect(body).toHaveProperty("message");
    expect(status).toBe(400);
  });

  test("DELETE /contacts/:id : error - Should not be able to delete a client contact with invalid contact", async () => {
    const { body: loginBody } = await request(app)
      .post("/login")
      .send(mockedClientLogin);

    const { body, status } = await request(app)
      .patch(`/contacts/${mockedValidUuid}`)
      .set("Authorization", `Bearer ${loginBody.token}`);

    expect(body).toHaveProperty("message");
    expect(status).toBe(404);
  });

  test("DELETE /contacts/:id : success - Must be able to delete a client contact", async () => {
    const { body: loginBody } = await request(app)
      .post("/login")
      .send(mockedClientLogin);

    const { body: getBodyId } = await request(app)
      .get("/contacts")
      .set("Authorization", `Bearer ${loginBody.token}`);

    const { status } = await request(app)
      .delete(`/contacts/${getBodyId[0].id}`)
      .set("Authorization", `Bearer ${loginBody.token}`);

    const { body } = await request(app)
      .get("/contacts")
      .set("Authorization", `Bearer ${loginBody.token}`);

    expect(body).toHaveLength(0);
    expect(status).toBe(204);
  });
});
