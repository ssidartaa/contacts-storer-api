import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedClient,
  mockedClientLogin,
  mockedInvalidLogin,
} from "../../mocks";

describe("/login", () => {
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

  test("POST /login : error - Should not be able to login with the user with incorrect password or email", async () => {
    const { body, status } = await request(app)
      .post("/login")
      .send(mockedInvalidLogin);

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("POST /login : success - Must be able to login with the user", async () => {
    const { body, status } = await request(app)
      .post("/login")
      .send(mockedClientLogin);

    expect(body).toHaveProperty("token");
    expect(status).toBe(200);
  });
});
