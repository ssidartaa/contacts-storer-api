import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";

import { Exclude } from "class-transformer";

import Contact from "./contacts.entity";

@Entity("clients")
class Client {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column("varchar")
  fullName: string;

  @Column("varchar", { unique: true })
  email: string;

  @Column("varchar")
  @Exclude()
  password: string;

  @Column("varchar")
  phoneNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Contact, (contact) => contact.client, { cascade: true })
  contacts: Contact[];
}

export default Client;
