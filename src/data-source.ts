import { DataSource } from "typeorm";
import "dotenv/config";

import Client from "./entities/clients.entity";
import Contact from "./entities/contacts.entity";

import { ClientsContactsEntities1675305213998 } from "./migrations/1675305213998-ClientsContactsEntities";
import { UpdateCascadeClient1675880138232 } from "./migrations/1675880138232-UpdateCascadeClient";

const AppDataSource = new DataSource(
  process.env.NODE_ENV === "test"
    ? {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: ["src/entities/*.ts"],
      }
    : {
        type: "postgres",
        host: process.env.HOST,
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        logging: true,
        synchronize: false,
        entities: [Client, Contact],
        migrations: [
          ClientsContactsEntities1675305213998,
          UpdateCascadeClient1675880138232,
        ],
      }
);

export default AppDataSource;
