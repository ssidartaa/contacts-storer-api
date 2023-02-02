import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";

import { Client } from "./clients.entity";

@Entity("contacts")
export class Contact {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column("varchar")
  fullName: string;

  @Column("varchar")
  email: string;

  @Column("varchar")
  phoneNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Client)
  client: Client;
}
