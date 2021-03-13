import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from "typeorm";

import { v4 as uuid } from "uuid";

@Entity()
export class Rounds extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  status: string;

  @Column()
  cut_off_date: Date;

  @Column()
  depart_date: Date;

  @Column()
  arrive_date: Date;

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
