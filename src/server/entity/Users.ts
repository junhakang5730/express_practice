import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
} from "typeorm";

import { Updates } from "./Updates";
import { Bills } from "./Bills";

import { v4 as uuid } from "uuid";

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone_number: number;

  @Column()
  total_weight: number;

  @OneToMany(() => Updates, (post) => post.user)
  updates: Updates[];

  @OneToMany(() => Bills, (bill) => bill.user)
  bills: Bills[];

  @Column({ type: "uuid" })
  uuid: string;

  @CreateDateColumn()
  join_date: Date;

  @UpdateDateColumn()
  update_date: Date;

  @BeforeInsert()
  createUuid() {
    this.uuid = uuid();
  }

  toJSON() {
    return { ...this, id: undefined };
  }
}
