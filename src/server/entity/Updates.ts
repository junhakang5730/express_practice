import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  ManyToOne,
} from "typeorm";

import { Users } from "./Users";

import { v4 as uuid } from "uuid";

@Entity()
export class Updates extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @ManyToOne(() => Users)
  user: Users;

  @Column()
  user_uuid: string;

  @Column({ type: "uuid" })
  uuid: string;

  @CreateDateColumn()
  create_date: Date;

  @UpdateDateColumn()
  update_date: Date;

  @BeforeInsert()
  createUuid() {
    this.uuid = uuid();
  }

  toJSON() {
    return { ...this, id: undefined };
  }

  // constructor({ title, body }: { title: string; body: string }) {
  //   super();
  //   Object.assign(this, { title, body });
  // }
}
